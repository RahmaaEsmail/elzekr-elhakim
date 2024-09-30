import { Drawer } from '@mui/material';
import DrawerClosing from './DrawerClosing';
import DrawerList from './DrawerList';
import '../index.css'
export default function QuranPlayerDrawer({ settingsOpened, toggleDrawer }) {
    return (
        <Drawer
            anchor={'right'}
            open={settingsOpened}
              className='side_pages'
            onClose={() => toggleDrawer(false)}
        >
          <img onClick={()=>{
            toggleDrawer()
          }} className='close_img' src="/images/close.png" alt="" />
            {/* <DrawerClosing toggleDrawer={toggleDrawer} /> */}

            <DrawerList />
        </Drawer>
    )
}
