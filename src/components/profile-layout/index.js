import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
function ProfileLayout({ profile }) {
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Profile">
      <h1>Профиль</h1>
      <p>Имя: <span className="Profile-text__bold">{profile.username}</span></p>
      <p>Телефон: <span className="Profile-text__bold">{profile.profile.phone}</span></p>
      <p>Email: <span className="Profile-text__bold">{profile.email}</span></p>
    </div>
  );
}

ProfileLayout.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default ProfileLayout;
