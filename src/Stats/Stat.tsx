import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Stat = () => {

  const [pages, setPages] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getData = async () => {
    const pagelist = await axios.get(`${BASE_URL}/pages`);

    setPages(pagelist?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Link to='/'>
        <button className='cursor' style={{ fontSize: 24, marginTop: 40, marginBottom: 40 }}>
          {' '}
          Back to Generate pageview
        </button>
      </Link>{' '}
      {pages && (
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No.</th>
              <th style={{ textAlign: 'left' }}>Event Id</th>
              <th style={{ textAlign: 'left' }}>Page title</th>
              <th className='width' style={{ textAlign: 'left' }}>
                Page description
              </th>
              <th style={{ textAlign: 'center' }}>Page tags</th>
              <th style={{ textAlign: 'center' }}>User ID</th>
              <th style={{ textAlign: 'left' }}>User joined</th>
            </tr>
          </thead>
          <tbody>
            {pages?.map((item: any, index: any) => {
              return (
                <tr className='key' key={item.id}>
                  <th scope='row'>{index + 1}</th>
                  <th>{item.id}</th>
                  <td className='width'>{item.page.title}</td>
                  <td className='width'>{item.page.description}</td>
                  <td>
                    {item.page.tags.map((tag: any, index: any) => {
                      return (
                        <ul key={index + 1}>
                          <li>{tag}</li>
                        </ul>
                      );
                    })}
                  </td>
                  <td>{item.user.id}</td>
                  <td>{item.user.created_at.slice(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {pages === [] && <div>There is currently no page data</div>}
    </>
  );
};

export default Stat;
