import {useState} from 'react'
import Header from './Header'
import ACRFormOld from './ACRFormOld'
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
        <div className='left-toggle-panel' onClick={toggleSingleForm}> { isSingle ? 'Bulk PDF'  : 'Single PDF' }  </div>
        
      </div>
      { isSingle ?  <ACRFormOld/>   :  <ACRCsvUpload/> }
     
      </>
  
    </div>
  )
}

export default ACRFormNew