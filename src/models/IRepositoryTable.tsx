
export interface IRepositoryTableDataProps {
  rowData: IRepositoryTableData[]
  headerData: IRepositoryTableHeaderData[]
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

  export interface IRepositoryTableSort {
    property: keyof IRepositoryTableData
    direction: IRepositoryTableOrder
  }

  export type IRepositoryTableOrder = 'asc' | 'desc';