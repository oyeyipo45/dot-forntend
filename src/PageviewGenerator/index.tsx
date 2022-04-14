import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';
import { usePageviewGenerator } from './logic';

export const PageviewGenerator: React.FC = () => {
  const { generate, pageview } = usePageviewGenerator();
  const ping = async () => {
    const serverPing = await axios.get(`${BASE_URL}`);
    return serverPing;
  };

  useEffect(() => {
    ping();
  }, []);

  return (
    <>
      <button className='cursor' style={{ fontSize: 24, marginBottom: 40 }} onClick={generate}>
        Generate pageview
      </button>
      <Link to='/stats'>
        <button className='cursor' style={{ fontSize: 24, marginBottom: 40, marginLeft: 20 }}>
          {' '}
          View pages statistics
        </button>
      </Link>{' '}
      {pageview && (
        <>
          <h3>Last pageview</h3>
          <p>Event ID: {pageview?.id}</p>
          <p>Event date: {pageview?.created_at.toISOString()}</p>
          <p>Page title: {pageview?.page?.title}</p>
          <p>Page description: {pageview?.page?.description}</p>
          <p>Page tags: {pageview.page?.tags?.join(', ')}</p>
          <p>User ID: {pageview?.user?.id}</p>
          <p>User joined: {pageview?.user?.created_at.toISOString()}</p>
        </>
      )}
    </>
  );
};
