import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { apiroutes } from '../App'
import { BsPlus } from "react-icons/bs"
import Navbar from './Navbar';
import { MdDelete, MdEdit } from './../../node_modules/react-icons/md/index.esm';
import { useNavigate } from 'react-router-dom';
  

const fetachemploye = (setEmployes) => {
  axios.get(apiroutes.employes).then((res) => {
    console.log(res.data.employes.length<=0);
    setEmployes(res.data.employes)
  }).catch((err) => {

  });
}

function Home() {
  const navigate=useNavigate()
  const authCheck=()=>{
    const authstatus=localStorage.getItem('authStatus')
    if(!authstatus){
      navigate('/login')
    }
  }
  authCheck()
  const [employes, setEmployes] = useState(false)

  const [employesId, setEmployesId] = useState(false)
  useEffect(() => {
    fetachemploye(setEmployes)
  }, [])
  const update = useCallback((data) => {
    setEmployesId(data)
  }, [employesId])

  const deletes = (id) => {
    axios.delete(apiroutes.employes + id).then(e => {
      fetachemploye(setEmployes)
    })
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="col-12 ">
          <div className="d-flex justify-content-end p-3">
            <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant='contained' startIcon={<BsPlus />} >Create New Employe</Button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employe No.</th>
              <th scope="col">Name</th>
              <th scope="col">Dep..</th>
              <th scope="col">Mobaile No.</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employes && employes.map((e, k) => {
              return (
                <>
                  <tr key={k}>
                    <th scope="row">{++k}</th>
                    <td>{e.EMPNO}</td>
                    <td>{e.FIRSTNME} {e.MIDINIT}</td>
                    <td>{e.WORKDEPT}</td>
                    <td>{e.PHONENO}</td>
                    <td>
                      <IconButton onClick={() => update(e)}><MdEdit color="yellow" /></IconButton>
                      <IconButton onClick={() => deletes(e.id)}><MdDelete color="red" /></IconButton>
                    </td>
                  </tr>
                </>
              )
            })}
            {(employes.length>0) ? null :<td colSpan={8}><center><span className='text-danger'>No data Found In Database Add Some Employee data</span></center></td>}
            
          </tbody>
        </table>
      </div>
      {employesId && <UpdateModale data={employesId} close={() => setEmployesId(false)} fetachemploye={() => fetachemploye(setEmployes)} />}

      {/* emplye Create Model */}
      <NewEmployeeCreateModel fetachemploye={() => fetachemploye(setEmployes)}/>
    </>
  )
}

export default Home

const UpdateModale = ({ data, close, fetachemploye }) => {
  const {
    FIRSTNME,
    MIDINIT,
    LASTNAME,
    WORKDEPT,
    PHONENO,
    HIREDATE,
    JOB,
    EDLEVEL,
    SEX,
    BIRTHDATE,
    SALARY,
    BONUS,
    COMM,
    id
  } = data;
  const [fname, setFIRSTNME] = useState(FIRSTNME)
  const [mname, setMIDINIT] = useState(MIDINIT)
  const [lname, setLASTNAME] = useState(LASTNAME)
  const [wd, setWORKDEPT] = useState(WORKDEPT)
  const [mon, setPHONENO] = useState(PHONENO)
  const [hd, setHIREDATE] = useState(HIREDATE)
  const [job, setJOB] = useState(JOB)
  const [edlev, setEDLEVEL] = useState(EDLEVEL)
  const [sex, setSEX] = useState(SEX)
  const [birth, setBIRTHDATE] = useState(BIRTHDATE)
  const [sall, setSALARY] = useState(SALARY)
  const [bon, setBONUS] = useState(BONUS)
  const [com, setCOMM] = useState(COMM)

  const submit = () => {
    const data = {
      FIRSTNME: fname,
      MIDINIT: mname,
      LASTNAME: lname,
      WORKDEPT: wd,
      PHONENO: mon,
      HIREDATE: hd,
      JOB: job,
      EDLEVEL: edlev,
      SEX: sex,
      BIRTHDATE: birth,
      SALARY: sall,
      BONUS: bon,
      COMM: com,
    }
    console.log(data);
    axios.put(apiroutes.employes + id, data).then(e => {
      if (!e.data.code) {
        alert(e.data.msg)
      }
      fetachemploye()
      setFIRSTNME("")
      setMIDINIT("")
      setLASTNAME("")
      setWORKDEPT("")
      setPHONENO("")
      setHIREDATE("")
      setJOB("")
      setEDLEVEL("")
      setSEX("")
      setBIRTHDATE("")
      setSALARY("")
      setBONUS("")
      setCOMM("")
      close()
    })
  }
  return (
    <>
      <div class={'modal fade show'} tabindex="-1" style={{ display: "block" }} aria-hidden="true">
        <div class="modal-dialog shadow-lg modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header border-0">
              <center className='col'>
                <h5 class="modal-title">Create New Employee</h5>
              </center>
              <button type="button" onClick={() => close()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">First name</label>
                  <input type="text" class="form-control" value={fname} onChange={(e) => setFIRSTNME(e.target.value)} placeholder="First name" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Middle name</label>
                  <input type="text" class="form-control" value={mname} onChange={(e) => setMIDINIT(e.target.value)} placeholder="Middle name" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Last name</label>
                  <input type="text" value={lname} class="form-control" onChange={(e) => setLASTNAME(e.target.value)} placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              {/* Sallery Detail */}
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Mobaile No.</label>
                  <input type="text" class="form-control" value={mon} onChange={(e) => setPHONENO(e.target.value)} placeholder="Mobaile No." aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Birthday</label>
                  <input id="formGroupExampleInput" value={birth} onChange={(e) => setBIRTHDATE(e.target.value)} type="date" class="form-control" placeholder="Middle name" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Select gender</label>
                  <select onChange={(e) => {
                    console.log(e.target.value)
                    setSEX(e.target.value)
                  }} class="form-select"
                    value={sex}
                    aria-label="Default select example">
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                </div>
              </div>
              {/* Field End */}
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Hireing date</label>
                  <input type="date"
                    value={hd}
                    class="form-control" onChange={(e) => setHIREDATE(e.target.value)} placeholder="Hireing date" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Work Department</label>
                  <input value={wd} type="text" class="form-control" onChange={(e) => setWORKDEPT(e.target.value)} placeholder="Work Department" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Job</label>
                  <input type="text" value={job} class="form-control" onChange={(e) => setJOB(e.target.value)} placeholder="Job" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Ed Level</label>
                  <input type="text" class="form-control" value={edlev} onChange={(e) => setEDLEVEL(e.target.value)} placeholder="Ed Level" aria-label="Last name" />
                </div>
              </div>
              {/* Sallery Detail */}
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Salary</label>
                  <input type="text" class="form-control" value={sall} onChange={(e) => setSALARY(e.target.value)} placeholder="Salary" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Bonus</label>
                  <input type="text" class="form-control" value={bon} onChange={(e) => setBONUS(e.target.value)} placeholder="Bonus" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Commision</label>
                  <input type="text" class="form-control" value={com} onChange={(e) => setCOMM(e.target.value)} placeholder="Commision" aria-label="Last name" />
                </div>
              </div>
              {/* Field End */}
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn col btn-primary" onClick={() => submit()}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const NewEmployeeCreateModel=({fetachemploye})=>{
  
  const [FIRSTNME, setFIRSTNME] = useState("")
  const [MIDINIT, setMIDINIT] = useState("")
  const [LASTNAME, setLASTNAME] = useState("")
  const [WORKDEPT, setWORKDEPT] = useState("")
  const [PHONENO, setPHONENO] = useState("")
  const [HIREDATE, setHIREDATE] = useState("")
  const [JOB, setJOB] = useState("")
  const [EDLEVEL, setEDLEVEL] = useState("")
  const [SEX, setSEX] = useState("")
  const [BIRTHDATE, setBIRTHDATE] = useState("")
  const [SALARY, setSALARY] = useState("")
  const [BONUS, setBONUS] = useState("")
  const [COMM, setCOMM] = useState("")
  const submit = () => {
    const data = {
      FIRSTNME: FIRSTNME,
      MIDINIT: MIDINIT,
      LASTNAME: LASTNAME,
      WORKDEPT: WORKDEPT,
      PHONENO: PHONENO,
      HIREDATE: HIREDATE,
      JOB: JOB,
      EDLEVEL: EDLEVEL,
      SEX: SEX,
      BIRTHDATE: BIRTHDATE,
      SALARY: SALARY,
      BONUS: BONUS,
      COMM: COMM,
    }
    console.log(data);
    axios.post(apiroutes.employes, data).then(e => {
      if (!e.data.code) {
        alert(e.data.msg)
      }
      fetachemploye()
      setFIRSTNME("")
      setMIDINIT("")
      setLASTNAME("")
      setWORKDEPT("")
      setPHONENO("")
      setHIREDATE("")
      setJOB("")
      setEDLEVEL("")
      setSEX("")
      setBIRTHDATE("")
      setSALARY("")
      setBONUS("")
      setCOMM("")
    })
  }
  return(
    <>
    <div class={'modal fade'} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog shadow-lg modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header border-0">
              <center className='col'>
                <h5 class="modal-title">Create New Employee</h5>
              </center>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">First name</label>
                  <input type="text" class="form-control" onChange={(e) => setFIRSTNME(e.target.value)} placeholder="First name" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Middle name</label>
                  <input type="text" class="form-control" onChange={(e) => setMIDINIT(e.target.value)} placeholder="Middle name" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Last name</label>
                  <input type="text" class="form-control" onChange={(e) => setLASTNAME(e.target.value)} placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              {/* Sallery Detail */}
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Mobaile No.</label>
                  <input type="text" class="form-control" onChange={(e) => setPHONENO(e.target.value)} placeholder="Mobaile No." aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Birthday</label>
                  <input id="formGroupExampleInput" onChange={(e) => setBIRTHDATE(e.target.value)} type="date" class="form-control" placeholder="Middle name" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Select gender</label>
                  <select onChange={(e) => {
                    console.log(e.target.value)
                    setSEX(e.target.value)
                  }} class="form-select" aria-label="Default select example">
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                </div>
              </div>
              {/* Field End */}
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Hireing date</label>
                  <input type="date" class="form-control" onChange={(e) => setHIREDATE(e.target.value)} placeholder="Hireing date" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Work Department</label>
                  <input type="text" class="form-control" onChange={(e) => setWORKDEPT(e.target.value)} placeholder="Work Department" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Job</label>
                  <input type="text" class="form-control" onChange={(e) => setJOB(e.target.value)} placeholder="Job" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Ed Level</label>
                  <input type="text" class="form-control" onChange={(e) => setEDLEVEL(e.target.value)} placeholder="Ed Level" aria-label="Last name" />
                </div>
              </div>
              {/* Sallery Detail */}
              <div class="row my-2">
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Salary</label>
                  <input type="text" class="form-control" onChange={(e) => setSALARY(e.target.value)} placeholder="Salary" aria-label="First name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Bonus</label>
                  <input type="text" class="form-control" onChange={(e) => setBONUS(e.target.value)} placeholder="Bonus" aria-label="Middle name" />
                </div>
                <div class="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">Commision</label>
                  <input type="text" class="form-control" onChange={(e) => setCOMM(e.target.value)} placeholder="Commision" aria-label="Last name" />
                </div>
              </div>
              {/* Field End */}
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn col btn-primary" onClick={() => submit()}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}