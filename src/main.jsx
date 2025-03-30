import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import { Provider } from 'react-redux'
import Routing from './Routing'
import store from './redux/Store'
import { SocketProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>

 <SocketProvider>
 <Routing />
 </SocketProvider>

      
     </Provider>
)
