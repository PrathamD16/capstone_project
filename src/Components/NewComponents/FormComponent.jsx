import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import BookingForm from './BookingForm';

const FormComponent = () => {
  return (
    <div className='px-[1rem] py-[1rem]'>
        <Grid container spacing={3}>
            <Grid border={2} size={8}>
                <BookingForm />
            </Grid>
            <Grid border={2} size={4}>
                <h3>This will be stack display</h3>
            </Grid>
        </Grid>
    </div>
  )
}

export default FormComponent
