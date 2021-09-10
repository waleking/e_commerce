import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({name, label, required}) => {
    const { control } = useFormContext(); // TODO ?

    return (
        <Grid item xs={12} sm={6}>
            {/* TODO, what's field here? */}
            <Controller
                render={({field})=>(<TextField {...field} fullWidth label={label} required={required}/>)}
                control={control}
                name={name}
                defaultValue=""
            />
        </Grid>
    )
}

export default FormInput;
