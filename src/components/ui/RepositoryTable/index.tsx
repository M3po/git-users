import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { IRepositoryTableData, IRepositoryTableDataProps, IRepositoryTableHeaderData, IRepositoryTableOrder } from 'src/models/IRepositoryTable';
import { Backdrop, CircularProgress, Paper } from '@material-ui/core';

const NUMBER_OF_ROWS_IN_VIEW = 7

export interface IRepositoryTableHeader {
  headerData: IRepositoryTableHeaderData[]
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IRepositoryTableData) => void
  order: IRepositoryTableOrder
  orderBy: string
}

const RepositoryTableHeader: React.FC<IRepositoryTableHeader> = ({  headerData, onRequestSort, orderBy, order}) => {
  const classes = useStyles();
  const createSortHandler = (property: keyof IRepositoryTableData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headerData.map((headData: IRepositoryTableHeaderData) => (
          <TableCell
            key={headData.id}
            sortDirection={orderBy === headData.id ? order : false}
          >
            {headData.hideSort ? 
              <span>{headData.label}</span> 
            :
              <TableSortLabel
                  active={orderBy === headData.id}
                  direction={orderBy === headData.id ? order : 'asc'}
                  onClick={createSortHandler(headData.id)}
                >
                  {headData.label}
                  {orderBy === headData.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export interface IRepositoryTableRef {
  resetTableData: () => void
  tableScrollToTop: () => void
}

export interface IRepositoryTable {
  data: IRepositoryTableDataProps
  dataCount: number
  initialPage: number
  initialRowsPerPage: number
  initialOrderDirection: IRepositoryTableOrder
  initialOrderProperty: keyof IRepositoryTableData
  handleTableAction: (page: number, rowsPerPage: number, order: IRepositoryTableOrder, orderBy: keyof IRepositoryTableData) => void
  isLoading: boolean
}

export const RepositoryTable = React.forwardRef<IRepositoryTableRef, IRepositoryTable>(({dataCount, data, initialPage, initialRowsPerPage, initialOrderDirection, initialOrderProperty, handleTableAction, isLoading}, ref) => {
  
  React.useImperativeHandle(ref, () => ({
    resetTableData: resetTable,
    tableScrollToTop: scrollToTop
  }));
  
  const classes = useStyles();
  const { headerData, rowData } = data
  const [order, setOrder] = React.useState<IRepositoryTableOrder>(initialOrderDirection);
  const [orderBy, setOrderBy] = React.useState<keyof IRepositoryTableData>(initialOrderProperty);
  const [page, setPage] = React.useState(initialPage)
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage)
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const handleRequestSort = (property: keyof IRepositoryTableData) => {
    const isAsc = orderBy === property && order === 'asc';
    const direction = isAsc ? 'desc' : 'asc'
    setOrder(direction);
    setOrderBy(property);
    handleTableAction(page, rowsPerPage, direction, property)
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    handleTableAction(newPage, rowsPerPage, order, orderBy)
  }

  const handleRowChangePerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
    handleTableAction(1, newRowsPerPage, order, orderBy)
  }

  const resetTable = () => {
      setPage(initialPage)
      setRowsPerPage(initialRowsPerPage)
      setOrder(initialOrderDirection);
      setOrderBy(initialOrderProperty);
  }

  const scrollToTop = () => {
    if(tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0
    }
  }
  const emptyRows = NUMBER_OF_ROWS_IN_VIEW > rowData.length ? NUMBER_OF_ROWS_IN_VIEW - rowData.length : 0
  return (
    <Paper className={classes.root}>
        <TableContainer className={classes.container} ref={tableContainerRef}>
          <Table
            stickyHeader
          >
            <RepositoryTableHeader
              headerData={headerData}
              order={order}
              orderBy={orderBy}
              onRequestSort={(_, property: keyof IRepositoryTableData) =>handleRequestSort(property)}
            />
            <TableBody>
              {rowData.map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell className={classes.nameCell}>
                        {row.name}
                      </TableCell>
                      <TableCell>{row.language}</TableCell>
                      <TableCell>{row.created_at}</TableCell>
                      <TableCell>{row.updated_at}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataCount}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={(_, newPage: number) => handlePageChange(newPage + 1)}
          onRowsPerPageChange={(e) => handleRowChangePerPage(+e.target.value)}
        />
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
  );
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    root: {
      width: '100%',
      position: "relative"
    },
    container: {
      maxHeight: 470,
    },
    nameCell: {
      maxWidth: 200
    },
    backdrop: {
      position: "absolute",
      zIndex: 2,
      bottom: 52
    }
  }),
);

export default RepositoryTable