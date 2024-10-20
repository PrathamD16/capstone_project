import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import BookingForm from './BookingForm';
import { BookingContext } from '../../Context/FormContext'

const FormComponent = () => {


  return (
    <div className='px-[1rem] py-[1rem]'>
      <BookingForm />
      {/* <FormContext>
        <Grid container spacing={3}>
          <Grid border={2} size={7}>
            <BookingForm />
          </Grid>
          <Grid border={2} size={5}>
            <BookingStack />
          </Grid>
        </Grid>
      </FormContext> */}
    </div>
  )
}

export default FormComponent
