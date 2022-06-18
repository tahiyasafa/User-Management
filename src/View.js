import React from 'react'

export const View = ({users}) => {
  return users.map(user=>(
      <tr key={user.firstName+user.dob}>
          <td>{user.firstName+' '+user.lastName}</td>
          <td>{user.gender}</td>
          <td>{user.dob}</td>
          <td>{user.city}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>

      </tr>

  ))
}
