import React from 'react'
import '../components/Profile.css'

function Profile() {
  return (
    <div className='profile'>
        <div className='profile_Content'>
            <div className='profile_Header'>
                <div className='profile_Pic'>

                </div>
                <div className='profile_Info'>
                    <p>Hello, <br></br> Josué Eliezer</p>
                </div>
            </div>
            <div className='profile_Buttons'>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='profile_Button'>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="var(--primary-white)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className='profile_Transactions'>
                <div className='profile_Transaction'>
                    <p>Airbnb</p>
                    <p>-$18.00</p>
                </div>
                <div className='profile_Transaction'>
                    <p>Rent</p>
                    <p>-$120.00</p>
                </div>
                <div className='profile_Transaction'>
                    <p>Spotify</p>
                    <p>-$38.00</p>
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Profile
