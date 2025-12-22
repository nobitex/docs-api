import React from 'react';
import clsx from 'clsx';
import '../../css/styles.css';

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={clsx('custom-footer')}>
      <div>
        <button onClick={() => window.open("https://nobitex.ir", "_blank")}>
          شرایط استفاده از API نوبیتکس</button>
        <button onClick={() => window.open("https://nobitex.ir", "_blank")}>پشتیبانی ۲۴/۷</button>
      </div>
      <p>
        Copyright © 2016 - {currentYear} Nobitex Ltd. All rights reserved
      </p>
    </footer>
  );
}
