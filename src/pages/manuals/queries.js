import gql from 'graphql-tag'

export const MANUALS_QUERY = gql`{
  manuals{
    id
    name
    ata_chapter
    ata_subchapter
    link
  }
}`;

export const CREATE_MANUAL = gql`
  mutation($manual: Imanual!){
    manuals{
      create(manual: $manual){
        id
      }
    }
  }
`

export const UPDATE_MANUAL = gql`
  mutation($manual: Umanual!){
    manuals{
      update(manual: $manual){
        id
      }
    }
  }
`

export const DELETE_MANUAL = gql`
  mutation($manual: Umanual!){
    manuals{
      archive(manual: $manual){
        id
      }
    }
  }
`