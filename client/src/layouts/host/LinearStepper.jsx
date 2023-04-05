import React, { useState,useContext } from 'react'
import {
    Stepper,
    Step,
    StepLabel,
    Stack,
    Typography,
    Box,
} from '@mui/material'
import BtnComponent from '../../component/BtnComponent'
import Propertydetail from './Propertydetail'
import PropertyType from './PropertyType'
import PropertyFacility from './PropertyFacility'
import PropertyAmenties from './PropertyAmenties'
import Propertyimage from './PropertyImage'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useForm, FormProvider } from 'react-hook-form'
import { Addproperty, editProperty } from '../../api/api'
import CircularIndeterminate from '../../component/CircularIndeterminate'
import { useSelector } from 'react-redux'
import { ExternalContext } from '../../context/CustomContext'
import { useNavigate } from 'react-router-dom'
function Findform({ activeStep, setValue, imgErr }) {
    switch (activeStep) {
    case 0:
        return <Propertydetail setValue={setValue} />
    case 1:
        return <PropertyType setValue={setValue} />
    case 2:
        return <PropertyFacility setValue={setValue} />
    case 3:
        return <PropertyAmenties setValue={setValue} />
    case 4:
        return <Propertyimage imgErr={imgErr} setValue={setValue} />
    case 5:
        return (
            <Typography variant="h3" m={10} textAlign={'center'}>
          Form Filled successfully
            </Typography>
        )
    default:
        return ''
    }
}

function LinearStepper({defaultData,isEdit}) {
    const [activeStep, setActiveStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const {setPropertyEdit } = useContext(ExternalContext)
    const userDetails = useSelector((state) => state.user.userDetails)
    const { trigger, ...methods } = useForm({
        defaultValues: defaultData,
    })
    const matches = useMediaQuery('(min-width:600px)')
    const steps = [
        'Property Information',
        'Property Type',
        'Facility Available',
        'Amenities Available',
        'Add Photos',
        'Success',
    ]
    const navigate=useNavigate()
    function handleHome() {
        navigate('/')
    }
    function handleNext() {
        if (activeStep <= 4) {
            setActiveStep(activeStep + 1)
        } else {
            console.log('handNext')
        }
    }
    function handleBack() {
        setActiveStep(activeStep - 1)
    }
    const [imgErr, setimgErr] = useState(false)
    async function onSubmit(data) {
        console.log(data)
        
        if (activeStep < 4) {
            handleNext()
        } else {
            let isValid = await trigger()
            if (data.images.length !== 6) {
                setimgErr(true)
            }
            if (isValid && data.images.length === 6) {
                console.log(activeStep)
                console.log(data)
                setActiveStep(activeStep + 1)
                setLoading(true)
                if (isEdit) {
                    editProperty(data).then(() => {
                        setLoading(false)
                        setPropertyEdit(null)
                    })
                } else {
                    Addproperty(data, userDetails._id).then(() => {
                        setLoading(false)
                    })
                }
            }
        }
    }

    return (
        <Box component={'div'} sx={{ maxWidth: '100%', minHeight: '50vh' }}>
            <>
                {matches ? (
                    <Stepper activeStep={activeStep} orientation="horizontal">
                        {steps.map((heading, index) => (
                            <Step key={index}>
                                <StepLabel>{heading}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                ) : (
                    ''
                )}
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        {loading ? (
                            <CircularIndeterminate />
                        ) : (
                            <>
                                <Findform
                                    activeStep={activeStep}
                                    imgErr={imgErr}
                                    setValue={methods.setValue}
                                />
                                <Box alignItems={'center'} justifyContent={'center'} >
                                    {activeStep>4 && <BtnComponent  content={'Back To Home'} callback={handleHome} />}
                                </Box>
                            </>
                        )}

                        {activeStep < 5 && (
                            <Stack direction={'row'} pt={4} spacing={2}>
                                <BtnComponent
                                    variant={'contained'}
                                    callback={handleBack}
                                    disable={activeStep === 0}
                                    content={'Back'}
                                />
                                <BtnComponent
                                    variant={'contained'}
                                    content={activeStep == 4 ? 'Finish' : 'Next'}
                                    type={'submit'}
                                />
                            </Stack>
                        )}
                    </form>
                </FormProvider>
            </>
        </Box>
    )
}

export default LinearStepper
