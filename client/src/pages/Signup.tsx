import { Auth } from "../components/Auth"
import { Quotation } from "../components/Quotation"

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div className="hidden lg:block"> 
            <Quotation/>
        </div>
 
    </div>
  )
}

