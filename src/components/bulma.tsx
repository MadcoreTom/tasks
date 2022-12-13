import * as React from "react";

// Create a labelled text field following the Bulma layout
export function TextField(props: { label: string, value: string, onChange: (value: string) => any }) {
    return <div className="field">
        <label className="label">{props.label}</label>
        <div className="control">
            <input className="input" type="text" value={props.value} onChange={evt => props.onChange(evt.target.value)} />
        </div>
    </div>
}

// Create a labelled text field following the Bulma layout
export function CheckboxField(props: { label: string, checked: boolean, onChange: (checked: boolean) => any }) {
    return <div className="field">
    <div className="control">
      <label className="checkbox">
        <input type="checkbox" checked={props.checked} onChange={evt=>props.onChange(evt.target.checked)}/>
        {" " + props.label}
      </label>
    </div>
  </div>
}

export function SelectField(props: { label: string, value: string, options: string[], values?: string[], onChange: (value: string) => any }) {
  return <div className="field">
    <label className="label">{props.label}</label>
    <div className="control">
      <div className="select">
        <select value={props.value} onChange={e => props.onChange(e.target.value)}>
          {props.options.map((t, i) => <option value={props.values ? props.values[i] : t} key={i}>{t}</option>)}
        </select>
      </div>
    </div>
  </div>
}

export function ButtonIcon(props: {text:string, onClick:()=>any, iconCode:string,buttonClass?:string}){
  return <button className={`button ${props.buttonClass}`} onClick={() => props.onClick()}>
  <span className="icon is-small">
      <i>{props.iconCode}</i>
  </span>
  <span>{props.text}</span>
</button>
}