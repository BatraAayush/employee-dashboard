import axios from 'axios'

export const GET_DATA = 'get_data';
export const SET_EMPLOYEES_LOADING = 'set_employees_loading';
export const SET_EMPLOYEES_ERROR = 'set_employees_error';
export const SET_DATA = 'set_data';
export const DELETE_EMPLOYEE = 'delete_employee';
export const DELETE_SELECTED_ID_EMPLOYEES = 'delete_selected_id_employees'

export const getData = () => async(dispatch) => {
    try{
        dispatch({type:SET_EMPLOYEES_LOADING, payload:true});
        const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
        dispatch({type:SET_DATA, payload:response.data.data})
    }catch(e){
        dispatch({type:SET_EMPLOYEES_ERROR, payload:e.response.data.message})
        console.log(e);
    }finally{
        dispatch({type:SET_EMPLOYEES_LOADING, payload:false});

    }
}
