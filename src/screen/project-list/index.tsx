import React from 'react';
import { useState, useEffect } from 'react';
import { cleanObj, useMount, useDebunced } from "utils/index";
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import qs from 'qs';

const apiUrl  = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  })
  
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  
  const debuncedParam = useDebunced(param, 2000)
  const fetchList  = () => {
    // 获取list
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(debuncedParam))}`).then(async res => {
      if(res.ok){
        setList(await res.json())
      }
    })
  }
  const fetchUsers  = () => {
    // 获取users
    fetch(`${apiUrl}/users`).then(async res => {
      if(res.ok){
        setUsers(await res.json())
      }
    })
  }
  useEffect(()=>{
    fetchList()
  }, [debuncedParam])

  useMount(fetchUsers)

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={ users } list={ list }/>
  </div>
}

