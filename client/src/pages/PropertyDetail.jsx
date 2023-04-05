import React from 'react'
import SingleProperty from '../layouts/PropertyDetail/SingleProperty'
import { useSelector } from 'react-redux'

export default function PropertyDetail() {
    const singleProperty = useSelector((state) => state.SingleProp)

    return <SingleProperty property={singleProperty} />
}
