import React from 'react'

function Status() {

const today = new Date()

const year = today.getFullYear()

const month = today.getMonth() + 1

const date = today.getDate()


  return (

    <div>
      <p>Date {year}年{month}月{date}日

      </p>
</div>
  )
}

export default Status