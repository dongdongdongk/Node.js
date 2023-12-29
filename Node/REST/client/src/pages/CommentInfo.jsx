import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
    const params = useParams();
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/profile/${params.username}`);
            setProfile(response.data);
          } catch (error) {
            console.error('프로필 정보를 불러오는 데 실패했습니다.', error);
            setProfile(null);
          }
        };
    
        fetchProfile();
      }, [params.username]);
    
    return (
      <div>
        <h1>사용자 프로필</h1>
        {profile ? (
          <div>
            <h2>{profile.username}</h2>
            <p>{profile.comment}</p>
          </div>
        ) : (
          <p>존재하지 않는 프로필입니다.</p>
        )}
      </div>
    );
  };
  
  export default Profile;