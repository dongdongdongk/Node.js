import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentUpdate from './CommentUpdate';
const Profile = () => {
    const params = useParams();
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/profile/${params.id}`);
            setProfile(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('프로필 정보를 불러오는 데 실패했습니다.', error);
            setProfile(null);
          }
        };
    
        fetchProfile();
      }, [params.id]);
    
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
        <Link to={`/profile/${params.id}/update`}>수정</Link>
      </div>
    );
  };
  
  export default Profile;