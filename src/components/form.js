import React, {useState} from 'react'
import moment from 'moment'
import logo from '../images/Bizzabo-Logo-SVG-No-Space.svg'
import {Alert} from 'react-bootstrap' 


const Form = () => {

    const [role, setRole] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [newApp, setNewApp] = useState(false)
    const [appRebrand, setAppRebrand] = useState(false)
    const [kickOffDay, setKickOffDay] = useState('defaultValue')
    const [clientInputDate, setClientInputDate] = useState('defaultValue')
    const [committedDate, setCommitedDate] = useState('defaultValue')
    const [errorMessageClientInputDay, setErrorMessageClientInputDay] = useState('')
    const [errorMessageKickOfDay, setErrorMessageKickOfDay] = useState(false)
    const [rebrandClientInputDate, setRebrandClientInputDate] = useState('defaultValue')
    const [rebrandCommittedDay, setRebrandCommittedDay] = useState('defaultValue')
    const [rebrandErrorMessage, setRebrandErrorMessage] = useState('')
    const [requiredFieldNewApp, setRequiredFieldNewApp] = useState(false)
    const [requiredFieldRebrand, setRequiredFieldRebrand] = useState(false)


    function setRoleForm(e) {
        let getRole = e.target.value
        if (getRole === 'Other') {
            setRole(true)
        } else {
            setRole(false)
        }

        if(getRole === 'Onboarding Manager' || getRole === 'Account Executive' ) {
            setShowMessage(true)
        } else {
            setShowMessage(false)
        }
    }

    function setWlaTypeForm(e) {
        let getWlaType = e.target.value
        if (getWlaType === 'New White Label App' ) {
            setNewApp(true)
            setRequiredFieldNewApp(true)
        } else {
            setNewApp(false)
            setRequiredFieldNewApp(false)
        }

        if (getWlaType === 'App Rebrand') {
            setAppRebrand(true)
            setRequiredFieldRebrand(true)
        } else {
            setAppRebrand(false)
            setRequiredFieldRebrand(false)
        }
    }

    function validationOfClientInputDay(clientInputDayParam, kickOffDayParam) {
        let getToday = moment(new Date()).format("YYYY-MM-DD")
        if (moment(clientInputDayParam).isBefore(getToday)) {
            setErrorMessageClientInputDay('Client Input Date must be in the future')
        } else {
            setErrorMessageClientInputDay('')
        }

        if (moment(kickOffDayParam).isBefore(getToday)) {
            setErrorMessageKickOfDay(true)
        } else {
            setErrorMessageKickOfDay(false)
        }

    }

    function validationOfRebrandClientInputDay(rebrandClientDayParam) {
        let getToday = moment(new Date()).format("YYYY-MM-DD")
        if(moment(rebrandClientDayParam).isBefore(getToday)) {
            setRebrandErrorMessage('Client Input Date must be in the future')
        } else {
            setRebrandErrorMessage('')
        }
    }

    function updateKickoffDay(e){
        let getaKickOffDay = e.target.value;
        let clientInputDate = moment(getaKickOffDay, "YYYY-MM-DD").add('days', 35)
        let commitedDate = moment(getaKickOffDay, "YYYY-MM-DD").add('days', 77)
        setClientInputDate(moment(clientInputDate._d).format("YYYY-MM-DD"))
        setCommitedDate(moment(commitedDate._d).format("YYYY-MM-DD"))
        setKickOffDay(moment(getaKickOffDay).format("YYYY-MM-DD"))
        validationOfClientInputDay(moment(clientInputDate._d).format("YYYY-MM-DD"), getaKickOffDay)
    }

    function updateClientInputDay(e){
        let getClientInputDate = e.target.value;
        let kickOffDay = moment(getClientInputDate, "YYYY-MM-DD").subtract('days', 35)
        let commitedDate = moment(getClientInputDate, "YYYY-MM-DD").add('days', 42)
        setClientInputDate(moment(getClientInputDate).format("YYYY-MM-DD"))
        setKickOffDay(moment(kickOffDay._d).format("YYYY-MM-DD"))
        setCommitedDate(moment(commitedDate._d).format("YYYY-MM-DD"))
        validationOfClientInputDay(getClientInputDate, kickOffDay)
    }

    function updateCommittedDay(e){
        let getCommittedDay = e.target.value;
        let kickOffDay = moment(getCommittedDay, "YYYY-MM-DD").subtract('days', 77)
        let clientInputDate = moment(getCommittedDay, "YYYY-MM-DD").subtract('days', 42)
        setClientInputDate(moment(clientInputDate._d).format("YYYY-MM-DD"))
        setKickOffDay(moment(kickOffDay._d).format("YYYY-MM-DD"))
        setCommitedDate(moment(getCommittedDay).format("YYYY-MM-DD"))
        validationOfClientInputDay(moment(clientInputDate._d).format("YYYY-MM-DD"), kickOffDay)
    }

    function updateRebrandClientDay(e) {
        let getRebrandClientDay = e.target.value
        let rebrandCommittedDayCalc = moment(getRebrandClientDay, "YYYY-MM-DD").add('days', 21)
        setRebrandClientInputDate(getRebrandClientDay)
        setRebrandCommittedDay(moment(rebrandCommittedDayCalc._d).format("YYYY-MM-DD"))
        validationOfRebrandClientInputDay(getRebrandClientDay)
    }

    function updateRebrandCommittedDay(e) {
        let getRebrandCommittedDay = e.target.value
        let rebrandClientDate = moment(getRebrandCommittedDay, "YYYY-MM-DD").subtract('days', 21)
        setRebrandClientInputDate(moment(rebrandClientDate._d).format("YYYY-MM-DD"))
        setRebrandCommittedDay(getRebrandCommittedDay)
        validationOfRebrandClientInputDay(moment(rebrandClientDate._d).format("YYYY-MM-DD"))
    }


    return (
        <div>
            <div className="container main-container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img className="logo" src={logo} alt="logo" />
                        <h2>Mobile App Form</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <form>
                        <div class="field-wrapper">
                            <label className="required">Your Role</label>
                            <select id="role" onChange={setRoleForm} required>
                                <option value="Customer Success Manager">Customer Success Manager</option>
                                <option value="Onboarding Manager">Onboarding Manager</option>
                                <option value="Account Manager">Account Manager</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Account Executive">Account Executive</option>
                                <option value="Other">Other</option>
                            </select>
                            {role ? <input type="text" placeholder="Add Your Role" id="other-role" /> : ''}
                            {showMessage ? <Alert variant="warning">Please be sure to loop in the relevant Customer Success Manager if you handover the account mid-process</Alert> : ''}
                        </div>
                        <div class="field-wrapper">
                            <label className="required">Your Name</label>
                            <input type="text" placeholder="Your Name" id="name" required />
                        </div>
                            <div class="field-wrapper">
                            <label className="required">Your Bizzabo Email </label>
                            <input type="text" placeholder="Your Bizzabo Email" id="bizzabo-email" required />
                        </div>
                        <div class="field-wrapper">
                            <label className="required">Account Name</label>
                            <input type="text" placeholder="Account Name" id="account-name"required />
                        </div>
                        <div class="field-wrapper">
                        <label className="required">Account Dashboard URL</label>
                        <input type="text" placeholder="Account Dashboard URL" id="account-dashboard-url" required />
                        </div>
                        <div class="field-wrapper">
                        <label className="required">WLA Process Type</label>
                        <select id="wla-proccess-type" onChange={setWlaTypeForm} required>
                            <option disabled selected value>None</option>
                            <option value="New White Label App">New White Label App</option>
                            <option value="App Rebrand">App Rebrand</option>
                        </select>
                        <div className="newAppContainer" style={{display: newApp ? 'block' : 'none'}}>
                            <h5>Process timeline</h5>

                            <div className="date-pickers-wrapper">
                                <div className="date-wrapper">
                                    <label className={newApp ? 'required' : ''}>Recommended Kick-off Date</label>
                                    <input type="date" id="kickoff-day" value={kickOffDay} onChange={updateKickoffDay} required={requiredFieldNewApp} />
                                </div>

                                <div className="date-wrapper">
                                    <label className={newApp ? 'required' : ''}>Client Input Date</label>
                                    <input type="date" id="client-input-date" onChange={updateClientInputDay} value={clientInputDate} required={requiredFieldNewApp} />
                                </div>

                                <div className="date-wrapper">
                                    <label className={newApp ? 'required' : ''}>Committed Release Date</label>
                                    <input type="date" id="committed-release-date" onChange={updateCommittedDay} value={committedDate} required={requiredFieldNewApp} />
                                </div>
                            </div>
                            <div className="error-clientday">{errorMessageClientInputDay}</div>
                            <div className="error-kickofday" style={{display: errorMessageKickOfDay ? 'block' : 'none'}}>
                            <Alert variant="warning">Note Client Input Date is in less than 5 weeks</Alert>
                                <input className={newApp ? 'required' : ''} type="checkbox" id="less-five-weeks-conf" /> Are You Sure?
                            </div>
                            <input className={newApp ? 'required' : ''} id="client-aware" type="checkbox" required={requiredFieldNewApp} /> Client is aware that during the build process no event of theirs will be available on Bizzabo’s Container App<br />
                        </div>
                        <div className="appRebrandContainer" style={{display: appRebrand ? 'block' : 'none'}}>
                            <h5>Process timeline</h5>
                            <div className="date-pickers-wrapper">
                                <div className="date-wrapper">
                                    <label className={appRebrand ? 'required' : ''}>Client Input Date</label>
                                    <input type="date" id="rebrand-client-input-day" value={rebrandClientInputDate} onChange={updateRebrandClientDay} required={requiredFieldRebrand} />
                                </div>
                                <div className="date-wrapper">
                                    <label className={appRebrand ? 'required' : ''}>Committed Release Date</label>
                                    <input type="date" id="rebrand-committed-release-day" value={rebrandCommittedDay} onChange={updateRebrandCommittedDay} required={requiredFieldRebrand} />
                                </div>
                            </div>
                            <div className="rebrand-error-message">
                                {rebrandErrorMessage}
                            </div>
                        </div>
                        </div>
                        <div className="button-wrapper">
                            <input type="submit" value="Submit" className="btn btn-success" />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
