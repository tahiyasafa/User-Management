import React from 'react'
import { v4 as uuid } from 'uuid';
export const View = ({users}) => {
  return users.map(user=>(
      <tr key={uuid()}>
          <td>{user.firstName+' '+user.lastName}</td>
          <td>{user.gender}</td>
          <td>{user.dob}</td>
          <td>{user.city}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>

      </tr>

  ))
}
