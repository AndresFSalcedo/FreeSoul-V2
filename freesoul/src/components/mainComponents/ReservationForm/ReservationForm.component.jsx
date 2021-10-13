import React from 'react'
import Content from '../checkout/staticInput'

function ReservationForm() {
  return (
    <div>
      <form>
        {Content.inputs.map((input, key)=>{
          return(<div key={key}>
          <p>
            <label>Nombre</label>
          </p>
          <p>
            <input>

            </input>
          </p>
        </div>)
        })}
        
      </form>
    </div>
  )
}

export default ReservationForm
