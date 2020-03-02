import gql from 'graphql-tag'

export const ROTABLES_QUERY = gql`{
	rotables{
		id
		name
		part_no
		serial_no
		airplane{
			id
      reg_no
		}
	}
}`;

export const CREATE_ROTABLE = gql`
  mutation($rotable: Irotable!){
    rotables{
      create(rotable: $rotable){
        id
      }
    }
  }
`

export const UPDATE_ROTABLE = gql`
  mutation($rotable: Urotable!){
    rotables{
      update(rotable: $rotable){
        id
      }
    }
  }
`

export const DELETE_ROTABLE = gql`
  mutation($rotable: Urotable!){
    rotables{
      archive(rotable: $rotable){
        id
      }
    }
  }
`