import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import CloseIcon from "@mui/icons-material/Close";
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const mapStyles = {
  height: "60vh",
  width: "100%",
};

function Index() {
  const [open, setOpen] = useState<any>(false);
  const [_startPosition, _setStartPosition] = useState<any>();
  const [_endPosition, _setEndPosition] = useState<any>();
  const [_address, _setAddress] = useState<any>();
  const [_latnLong, _setLatnLong] = useState<any>({ lat: 48.0, lng: -122.0 });
  const [_companyName, _setCompanyName] = useState<any>();
  const [_city, _setCity] = useState<any>();
  const [_country, _setCountry] = useState<any>();
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const createContact = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const onStartChange = (e: any) => {
    var value = e.target.value;
    getLattitude(value);
  };

  const onEndChange = (e: any) => {
    var value = e.target.value;
    getLattitude(value);
  };

  const onCityChange = (e: any) => {
    _setCity(e.target.value);
    let city = e.target.value;
    var address = _companyName + "," + _address + "," + _country + "," + city;
    getLattitude(address);
  };

  const confirm = () => {};

  const getLattitude = (value: any) => {
    let address = value;
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBHgSPzWeXqELD-kI83l6GU30OpNbn573Y&address=" +
          address
      )
      .then((response) => {
        _setLatnLong({
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
      });
  };

  return (
    <div className="bgColor">
      <div className="container-fluid col-md-12 p-4">
        <div className="col-md-4">
          <div className="pb-3">
            Manage all your supplier contacts and your interaction history
            within this page.
          </div>
          <div>
            <TextField
              id="input-with-icon-textfield"
              className="searchText w-75"
              placeholder="Search for a Supplier"
              label=" "
              sx={{ "& legend": { display: "none" }, "& fieldset": { top: 0 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div className="col-md-12" style={{ borderBottom: "2px solid #d3d3d3" }}>
        <Nav
          className="col-md-6 d-flex justify-content-between navTab"
          defaultActiveKey="link-1"
          as="ul"
        >
          <Nav.Item className="col-md-4" as="li">
            <Nav.Link eventKey="link-1">Suppliers</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col-md-4" as="li">
            <Nav.Link eventKey="link-2">Contacts</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col-md-4" as="li">
            <Nav.Link eventKey="link-3">Purchase Orders</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="container-fluid col-md-12 yourSupplier p-4">
        <div className="col-md-12 d-flex justify-content-between align-items-center supplierCont">
          <div className="ySupplier">Your Suppliers</div>
          <div className="col-md-3 d-flex justify-content-end">
            <div className="pR-2">
              <Button className="supplyButton">Import Data</Button>
            </div>
            <div className="pL-2">
              <Button onClick={() => createContact()} className="supplyButton">
                Add Supplier
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ border: "3px dashed #d3d3d3", height: "80vH" }}
          >
            <div className="text-center emptyContact">
              Your Contacts list is empty!
              <br />
              <Button onClick={() => createContact()}>Click here</Button> to
              create a new contact.
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 d-flex">
        <Dialog className="addNewSupplier" open={open}>
          <div className="d-flex justify-content-between align-items-center pb-4">
            <div>
              <h5 style={{ margin: "0px" }}>Add New Supplier</h5>
            </div>
            <div>
              <CloseIcon className="pointer" onClick={() => closePopup()} />
            </div>
          </div>
          <div>
            <form onSubmit={() => confirm()}>
              <div className="pt-4 pb-4">
                <div className="pb-2">
                  <label className="pb-1">Supplier Company Name</label>
                  <br />
                  <TextField
                    className="w-100 confirmText"
                    value={_companyName}
                    onChange={(e: any) => _setCompanyName(e.target.value)}
                  />
                </div>
                <div className="pb-2">
                  <label className="pb-1">Supplier Company Address</label>
                  <br />
                  <TextField
                    className="w-100 confirmText"
                    value={_address}
                    onChange={(e: any) => _setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-12 d-flex pb-2">
                  <div className="col-md-6 pR-1">
                    <label className="pb-1">Supplier Country</label>
                    <br />
                    <TextField
                      select
                      className="w-100 confirmText"
                      value={_country}
                      onChange={(e: any) => _setCountry(e.target.value)}
                    >
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Africa">Africa</MenuItem>
                      <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                    </TextField>
                  </div>
                  <div className="col-md-6 pL-1">
                    <label className="pb-1">Supplier City</label>
                    <br />
                    <TextField
                      className="w-100 confirmText"
                      value={_city}
                      onChange={(e: any) => onCityChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-4">
                <h6 className="font">Ports</h6>
                <div className="col-md-12 d-flex">
                  <div className="col-md-6 pR-1">
                    <label className="pb-1">Source Port</label>
                    <br />
                    <TextField
                      select
                      className="w-100 confirmText"
                      value={_startPosition}
                      onChange={(e: any) => onStartChange(e)}
                    >
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Africa">Africa</MenuItem>
                      <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                      <MenuItem value="Madurai">Madurai</MenuItem>
                      <MenuItem value="Chennai">Chennai</MenuItem>
                      <MenuItem value="Vellore">Vellore</MenuItem>
                    </TextField>
                  </div>
                  <div className="col-md-6 pL-1">
                    <label className="pb-1">Destination Port</label>
                    <br />
                    <TextField
                      select
                      className="w-100 confirmText"
                      value={_endPosition}
                      onChange={(e: any) => onEndChange(e)}
                    >
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Africa">Africa</MenuItem>
                      <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                    </TextField>
                  </div>
                </div>
              </div>
              <div className="mapArea pb-4">
                <div>
                  <LoadScript googleMapsApiKey="AIzaSyBHgSPzWeXqELD-kI83l6GU30OpNbn573Y">
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={15}
                      center={_latnLong}
                    >
                      <Marker 
                        key={"red-marker"} 
                        position={_latnLong} 
                        icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        onClick={() => setSelectedMarker({ type: 'red', position: _latnLong })}
                      />
                      <Marker 
                        key={"blue-marker"} 
                        position={_latnLong} 
                        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        onClick={() => setSelectedMarker({ type: 'blue', position: _latnLong })}
                      />
                      <Marker 
                        key={"green-marker"} 
                        position={_latnLong} 
                        icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        onClick={() => setSelectedMarker({ type: 'green', position: _latnLong })}
                      />
                      {selectedMarker && (
                        <InfoWindow
                          position={selectedMarker.position}
                          onCloseClick={() => setSelectedMarker(null)}
                        >
                          <div>
                            {selectedMarker.type === 'red' && (
                              <div>Typhoon in Philippine raising the alert in the country, all activity is stopped</div>
                            )}
                            {selectedMarker.type === 'blue' && (
                              <div>Port Dwell time data: ...</div>
                            )}
                            {selectedMarker.type === 'green' && (
                              <div>{_companyName}, {_address}</div>
                            )}
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  </LoadScript>
                </div>
                <label>Hover Over a map marker to learn more</label>
              </div>
              <div className="pt-4 pb-2">
                <Button className="confirmButton">Confirm</Button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Index;
