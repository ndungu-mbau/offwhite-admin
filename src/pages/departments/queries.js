import gql from 'graphql-tag'

export const DEPARTMENTS_QUERY = gql`{
	departments{
		id
		name
		description
		hod{
			name
		}
    users{
      id
      name
    }
	}
}`;

export const DEPARTMENT_QUERY = gql`
query($department: Udepartment!){
	department(department: $department){
		id
		name
		description
		hod{
			name
      phone
		}
    users{
      id
      name
      phone
      type
    }
	}
}`;

export const DATA_QUERY = gql`
{
  users{
    id
    name
    type
  }
}`

export const CREATE_DEPARTMENT = gql`
  mutation($department: Idepartment!){
    departments{
      create(department: $department){
        id
      }
    }
  }
`

export const UPDATE_DEPARTMENT = gql`
  mutation($department: Udepartment!){
    departments{
      update(department: $department){
        id
      }
    }
  }
`

export const DELETE_DEPARTMENT = gql`
  mutation($department: Udepartment!){
    departments{
      archive(department: $department){
        id
      }
    }
  }
`

export const CREATE_HOD = gql`
  mutation($user: Iuser!){
    users{
      create(user: $user){
        id
        name
        type
      }
    }
  }
`