import React, { useState } from 'react'

export default function InputContainer({fromQuery, setModalType}) {
    const [value, setValue] = useState(fromQuery)
  return (
    <div className="search-container">
        <label>Nástupní stanice:</label>
          <input
            type="text"
            value={fromQuery}
            readOnly
            onClick={() => setModalType("from")}
            placeholder="Vyberte nástupní stanici..."
            className="search-input"
          />
      </div>
  )
}
