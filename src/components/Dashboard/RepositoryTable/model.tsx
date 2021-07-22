
export interface IRepositoryTableDataProps {
  rowData: IRepositoryTableData[]
  headerData: IRepositoryTableHeaderData[]
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

export interface IRepositoryTableData {
    name: string
    language: string
    created_at: string
    updated_at: string
  }

  export interface IRepositoryTableHeaderData {
    id: keyof IRepositoryTableData
    label: string
    hideSort?: boolean
  }

  export interface IRepositoryTableHeader {
    headerData: IRepositoryTableHeaderData[]
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IRepositoryTableData) => void
    order: IRepositoryTableOrder
    orderBy: string
  }

  export interface IRepositoryTableSort {
    property: keyof IRepositoryTableData
    direction: IRepositoryTableOrder
  }

  export type IRepositoryTableOrder = 'asc' | 'desc';