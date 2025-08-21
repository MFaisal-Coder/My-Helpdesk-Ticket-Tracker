import { Navigate } from "react-router-dom"
import { userInfo } from "../contexts/Loggeduser"

const ProtectedRoute = ({children, allowedRole}) => {
  const user =  userInfo()

  if(!user){
    return <Navigate to='/login' replace />
  }

  if(!allowedRole.includes(user.role)){
    return <Navigate to='/home' replace />
  }
  
  return children
  
}

export default ProtectedRoute
