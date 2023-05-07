import { useState } from 'react';
import {IndividualTaxCal} from '../../components/'
import './Calculators.css'

const Calculators: React.FC = () => {
    const [userType,setUserType] = useState();

    return (
      <div className='center'>
        <IndividualTaxCal/>
      </div>
    );
  };
  
  export default Calculators;
  