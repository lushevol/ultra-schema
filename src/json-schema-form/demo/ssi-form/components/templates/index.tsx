import type { ObjectFieldTemplateProps } from '@rjsf/utils';
import { Col, Row } from 'antd';
import { useCallback } from 'react';

const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  return (
    <div id={props.idSchema.$id}>
      <span className="title">{props.title}</span>
      <span className="description">{props.description}</span>
      <SsiVostroFormLayout {...props} />
    </div>
  );
};

export const ssiFormTemplates = {
  ObjectFieldTemplate,
};

const SsiVostroFormLayout = (props: ObjectFieldTemplateProps) => {
  const getPropertyContent = useCallback(
    (name: string) => {
      const property = props.properties.find((p) => p.name === name);
      return property ? property.content : null;
    },
    [props.properties],
  );

  return (
    <div className="ssi-vostro-form-content">
      {/* Primary Information */}
      <div className="primary-section">
        <h3>Primary Information</h3>
        <div className="grid-2">
          <Row>
            <Col span={12}>{getPropertyContent('ssiType')}</Col>
            <Col span={12}>{getPropertyContent('swiftType')}</Col>
            <Col span={12}>{getPropertyContent('settlementMeans')}</Col>
            <Col span={12}>{getPropertyContent('settlementAccount')}</Col>
            <Col span={12}>{getPropertyContent('coveredPayment')}</Col>
          </Row>
        </div>
      </div>

      {/* Beneficiary Information */}
      <div className="beneficiary-section">
        <h3>Beneficiary Information</h3>
        <div className="grid-2">
          <Row>
            <Col span={12}>{getPropertyContent('beneficiaryBic')}</Col>
            <Col span={12}>{getPropertyContent('beneficiaryName')}</Col>
            <Col span={12}>{getPropertyContent('beneficiaryName2')}</Col>
            <Col span={12}>{getPropertyContent('beneficiaryAccount')}</Col>
            <Col span={12}>{getPropertyContent('beneficiaryAddress')}</Col>
            <Col span={12}>{getPropertyContent('beneficiaryCity')}</Col>
            <Col span={12}>{getPropertyContent('charges')}</Col>
            <Col span={12}>{getPropertyContent('tpp')}</Col>
          </Row>
        </div>
      </div>

      {/* Account with Institution */}
      <div className="account-institution-section">
        <h3>Account with Institution</h3>
        <div className="grid-2">
          <Row>
            <Col span={12}>
              {getPropertyContent('accountWithInstitutionBic')}
            </Col>
            <Col span={12}>
              {getPropertyContent('accountWithInstitutionName')}
            </Col>
            <Col span={12}>
              {getPropertyContent('accountWithInstitutionAccount')}
            </Col>
            <Col span={12}>
              {getPropertyContent('accountWithInstitutionAddress')}
            </Col>
            <Col span={12}>
              {getPropertyContent('accountWithInstitutionCity')}
            </Col>
          </Row>
        </div>
      </div>

      {/* Intermediary Institution */}
      <div className="intermediary-institution-section">
        <h3>Intermediary Institution</h3>
        <div className="grid-2">
          <Row>
            <Col span={12}>{getPropertyContent('intermediaryBic')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryName')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryAccount')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryAddress')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryCity')}</Col>
          </Row>
        </div>
      </div>

      {/* Receiver's Correspondent */}
      <div className="receiver-correspondent-section">
        <h3>Receiver's Correspondent</h3>
        <div className="grid-2">
          <Row>
            <Col span={12}>
              {getPropertyContent('receiversCorrespondentBic')}
            </Col>
            <Col span={12}>
              {getPropertyContent('receiversCorrespondentName')}
            </Col>
            <Col span={12}>
              {getPropertyContent('receiversCorrespondentAccount')}
            </Col>
            <Col span={12}>
              {getPropertyContent('receiversCorrespondentAddress')}
            </Col>
            <Col span={12}>
              {getPropertyContent('receiversCorrespondentCity')}
            </Col>
          </Row>
        </div>
      </div>

      {/* Ordering Customer */}
      <div className="ordering-customer-section">
        <h3>Ordering Customer</h3>
        <div className="grid-2">
          <Row>
            <Col span={12}>{getPropertyContent('orderCustomerBic')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerName')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerAccount')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerAddress')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerCity')}</Col>
          </Row>
        </div>
      </div>

      {/* Additional Information */}
      <div className="additional-info-section">
        <h3>Additional Information</h3>
        <div className="grid-2">
          <div className="sender-info-subsection">
            <h4>Sender to Receiver Information</h4>
            <Row>
              <Col span={6}>{getPropertyContent('senderToReceiver1')}</Col>
              <Col span={6}>{getPropertyContent('senderToReceiver2')}</Col>
              <Col span={6}>{getPropertyContent('senderToReceiver3')}</Col>
              <Col span={6}>{getPropertyContent('senderToReceiver4')}</Col>
              <Col span={6}>{getPropertyContent('senderToReceiver5')}</Col>
              <Col span={6}>{getPropertyContent('senderToReceiver6')}</Col>
            </Row>
          </div>
          <div className="remittance-info-subsection">
            <h4>Remittance Information</h4>
            <Row>
              <Col span={6}>{getPropertyContent('remittanceInfomation1')}</Col>
              <Col span={6}>{getPropertyContent('remittanceInfomation2')}</Col>
              <Col span={6}>{getPropertyContent('remittanceInfomation3')}</Col>
              <Col span={6}>{getPropertyContent('remittanceInfomation4')}</Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ssiVostroFormTemplates = {
  ObjectFieldTemplate: SsiVostroFormLayout,
};
