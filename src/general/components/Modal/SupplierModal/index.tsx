import React, { useEffect, useMemo, useState } from 'react';
import { Close as CloseIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputLabel, Modal, TextField } from '@mui/material';

import { style } from 'src/utils/CustomStyle/StyleModal';
import CustomeSelectField from '../../Field/CustomeSelectField';
import { AddressPlace } from 'src/types/utils';
import { placeDataSelect } from 'src/utils/PlaceData/placeDataSelect';
import { SupplierType } from 'src/types/supplier.type';

interface Props {
  supplier: SupplierType;
  open: boolean;
  onClose: () => void;
  onChangeSupplier: (title: string, value: any) => void;
  onConfirm: () => void;
}
export default function SupplierModal(props: Props) {
  const { supplier, open = false, onClose, onConfirm, onChangeSupplier } = props;
  const [address, setAddress] = useState<AddressPlace>({} as AddressPlace);

  const handleSetAddress = (title: string, value: string) => {
    setAddress((prev: AddressPlace) => ({
      ...prev,
      [title]: value,
    }));
  };
  useEffect(() => {
    const userAddress = `${
      address?.other ? address?.other + ', ' : ''
    }${address?.wards}, ${address?.districts}, ${address?.city} `;
    onChangeSupplier('address', userAddress);
  }, [address]);
  const districtsOptions = useMemo(() => {
    return placeDataSelect.find((place) => place?.Name === address.city)?.Districts;
  }, [address]);
  const wardOptions = useMemo(() => {
    return districtsOptions?.find((place) => place?.Name === address.districts)?.Wards;
  }, [address]);
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} className="modal-wrapper supplier-modal">
        <Box sx={style}>
          <div className="modal-wrapper-headding">
            <p className="title">Thông tin nhà cùng cấp {supplier.name}</p>
            <IconButton onClick={onClose}>
              <CloseIcon color="error" className="close-btn" />
            </IconButton>
          </div>
          <Box className="modal-form">
            <Box className="modal-form-item orther-supplier">
              <p className="modal-form-item-title">Mã nhà cùng cấp (Tự sinh nếu không nhập)</p>
              <TextField
                required
                fullWidth
                value={supplier.code}
                onChange={(e) => {
                  onChangeSupplier('code', e.target.value);
                }}
              />
            </Box>
            <Box className="modal-form-item orther-supplier">
              <p className="modal-form-item-title">Tên nhà cùng cấp</p>
              <Box className="orther-supplier">
                <TextField
                  fullWidth
                  required
                  value={supplier.name}
                  onChange={(e) => onChangeSupplier('name', e.target.value)}
                />
                <Grid container justifyContent={'space-between'}>
                  <Grid xs={5.5}>
                    <p className="modal-form-item-title mt12">Email nhà cung cấp</p>
                    <TextField
                      fullWidth
                      required
                      value={supplier.email}
                      onChange={(e) => onChangeSupplier('email', e.target.value)}
                    />
                  </Grid>
                  <Grid xs={5.5}>
                    <p className="modal-form-item-title mt12">Số điện thoại nhà cung cấp</p>
                    <TextField
                      fullWidth
                      required
                      value={supplier.phone}
                      onChange={(e) => onChangeSupplier('phone', e.target.value)}
                    />
                  </Grid>
                </Grid>
                <p className="modal-form-item-title mt12">Địa chỉ</p>

                <Grid container gap={2} wrap="wrap">
                  <CustomeSelectField
                    title="Thành phố"
                    value={address?.city}
                    onChange={(e: string) => handleSetAddress('city', e)}
                    options={placeDataSelect}
                  />
                  <CustomeSelectField
                    title="Huyện"
                    value={address?.districts}
                    onChange={(e: string) => handleSetAddress('districts', e)}
                    options={districtsOptions}
                  />
                  <CustomeSelectField
                    title="Thị trấn/ xã"
                    value={address?.wards}
                    onChange={(e: string) => handleSetAddress('wards', e)}
                    options={wardOptions}
                  />
                  <div>
                    <InputLabel id="other-address">Khác</InputLabel>

                    <TextField
                      label="Khác"
                      value={address?.other}
                      onChange={(e) => handleSetAddress('other', e.target.value)}
                    />
                  </div>
                </Grid>
              </Box>
            </Box>
          </Box>
          <Button variant="contained" className="modal-wrapper-save-btn" onClick={onConfirm}>
            Lưu
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
