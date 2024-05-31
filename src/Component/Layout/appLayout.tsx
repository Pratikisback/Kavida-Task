import React, { lazy, useState, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const SideNavBar = lazy(() => import("../includes/sideNavBar"));
const HeaderNavBar = lazy(() => import("../includes/headerNavBar"));
const Footer = lazy(() => import("../includes/Footer"));

function Index() {
  let location = useLocation();
  const [_toggleSidebar, _setToggleSidebar] = useState<boolean>(true);
  const [_isMobile, _setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    const width = hasWindow ? window.innerWidth : null;

    if (width && width <= 768) {
      _setIsMobile(true);
      _setToggleSidebar(true);
    } else {
      _setIsMobile(false);
      setTimeout(() => _setToggleSidebar(false), 100);
    }
  }, [location]);

  return (
    <>
      <Suspense fallback={<div>Loading... almost there!</div>}>
        <div className="col-md-12 d-flex">
          <div className="col-md-2 sideNavDiv">
            <SideNavBar />
          </div>
          <div className="col-md-10 mainDiv">
            <div className="col-md-10 headerNav">
              <HeaderNavBar />
            </div>
            <div className="outletChildren">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Index;
