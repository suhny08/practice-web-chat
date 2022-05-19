import userData from './userData.json';


export default function ProfileImage({user}) {
    const profile = user.profile;
    console.log(profile);
    return <img src={profile} width="30" height="30" alt="" />;
}


export function KimProfile() {
    return <ProfileImage user={ userData[0] } />;
}

export function LeeProfile() {
    return <ProfileImage user={ userData[1] } />;
}