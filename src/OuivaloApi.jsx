import React from 'react'
import styles from './ouivaloapi.module.css'
import { useState } from 'react'


export const OuivaloApi = () => {
    const [id,setId] = useState("")
    const [date, setDate] = useState("")
    const [urlRelais, setUrlRelais] = useState("")
    const [message, setMessage] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")

    let submitData = async(e) => {
        
        e.preventDefault()

        try{

            let sendData = await fetch('https://script.google.com/macros/s/AKfycby-TJmFFUFTfiNUbMoSIZx8LVtiskQ-bUt4xO6hmrU0XQpJS8IPUBow/exec', {
                method :"POST",
                body: JSON.stringify({
                    id:id,
                    date:date,
                    urlRelais:urlRelais,
                    message:message
                })
        })
        let sendDataJson = sendData.json()
        if(sendData.status === 200){
            setId("")
            setDate("")
            setUrlRelais("")
            setMessage("")
            setMessageSuccess("Candidature bien envoyée")
        }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <>
        <form className={styles.form} onSubmit={submitData}>
            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label htmlFor="id">Email</label>
                    <input
                        type="email"
                        name="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    /> 
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="date">Date d'essai</label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    /> 
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label htmlFor="url_relais">Git Repository</label>
                    <input
                        type="text"
                        name="url_relais"
                        value={urlRelais}
                        onChange={(e) => setUrlRelais(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea type="text" value={message} name="message"  onChange={(e) => setMessage(e.target.value)} />
                </div>
            </div>
        <button className={styles.buttonSubmit} type="submit">Envoyer</button>
    </form>
    <div className="message">{messageSuccess ? <p>{messageSuccess} 🥳</p> : null}</div>
    </>
    
    )
}

