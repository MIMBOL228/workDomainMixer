import React, {useEffect, useState} from 'react'
import './App.css'

const getConfigByDomains = (domains: string, redirectTime: number) => {
    const splitDomains = domains
        .split("\n")
    console.log("df",domains,JSON.stringify(domains), splitDomains, splitDomains.length)
    if (splitDomains.length < 2) return "";

    return splitDomains
        .map((domain, key) => {
            if ((key !== 0 && key % 2 !== 0) || key + 1 === splitDomains.length)
                return null;
            return {
                from: domain,
                to: splitDomains[key + 1],
                time: redirectTime,
            }
        })
        .filter(domain => domain)
}

function App() {
    const [domains, setDomains] = useState("");
    const [config, setConfig] = useState("");
    const [redirectTime, setRedirectTime] = useState(1000)

    const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDomains(e.target.value);
    }

    const onRedirectTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRedirectTime(+e.target.value);
    }

    useEffect(() => {
        setConfig(JSON.stringify(getConfigByDomains(domains, redirectTime)))
    }, [domains, redirectTime]);

    return (
        <>
            <textarea onChange={onTextareaChange} value={domains}></textarea>
            <div className="redirect_time">
                <label htmlFor="redirect_time_input">Время в мс</label>
                <input
                    type="number"
                    id="redirect_time_input"
                    placeholder="Время в мс"
                    value={redirectTime}
                    onChange={onRedirectTimeInputChange}
                />
            </div>
            <textarea value={config}></textarea>
        </>
    )
}

export default App
