import React from 'react';
import { useState } from "react"
import { cleanObj, useMount, useDebunced } from "utils/index";

interface User {
  id: string;
  name: string;
}
interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  }, 
  setParam: (param: SearchPanelProps["param"]) => void
}

export const SearchPanel = ( {users, param, setParam}: SearchPanelProps ) => {
  
  return <form>
    <div>
      <input type="text" value = { param.name } onChange = {evt => setParam({
        ...param, 
        name: evt.target.value 
      })}/>
    </div>
    <div>
      <select value = { param.personId } onChange = { evt => setParam({
        ...param, 
        personId: evt.target.value 
      })}>
        <option value="">负责人</option>
        { users.map( user => <option value = { user.id } key={ user.id }> {user.name} </option>) }
      </select>
    </div>
  </form>
}