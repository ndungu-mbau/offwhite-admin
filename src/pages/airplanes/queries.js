import gql from 'graphql-tag'

export const AIRPLANES_QUERY = gql`{
	airplanes{
		id
		fleet
		reg_no
	}
}`;

export const CREATE_AIRPLANE = gql`
  mutation($airplane: Iairplane!){
    airplanes{
      create(airplane: $airplane){
        id
      }
    }
  }
`

export const UPDATE_AIRPLANE = gql`
  mutation($airplane: Uairplane!){
    airplanes{
      update(airplane: $airplane){
        id
      }
    }
  }
`

export const DELETE_AIRPLANE = gql`
  mutation($airplane: Uairplane!){
    airplanes{
      archive(airplane: $airplane){
        id
      }
    }
  }
`