import React from 'react';
import { PrimarySelect, PrimarySelectProp } from '../../components';

interface GenderSelectProps extends PrimarySelectProp {

}
export const GenderSelect: React.FC<GenderSelectProps> = ({
    ...rest
}) => {
    return (
        <PrimarySelect
            label="Gender"
            placeholder="Select gender"
            {...rest}
        >
            <option value="male">Male</option>
            <option value="female">Female</option>
        </PrimarySelect>
    )
}