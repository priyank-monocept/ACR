import {useState} from 'react'
import Header from './Header'
import ACRFormFields from './ACRFormFields'
import "../App.css"
import ACRCsvUpload from './ACRcsvupload'

const ACRFormNew = () => {
  const [isSingle, SetIsSingle] = useState(true);

  const toggleSingleForm = () => {
    SetIsSingle(!isSingle);
  };

  return (
    <div>
      <>
      <Header/>
      <div className='toggleTb'>
        <div className='left-toggle-panel' onClick={toggleSingleForm}> { isSingle ? 'Single PDF'  : 'Bulk PDF' }  </div>
        
      </div>
      { isSingle ?  <ACRFormFields/>   :  <ACRCsvUpload/> }
     
      </>
  
    </div>
  )
}

export default ACRFormNew