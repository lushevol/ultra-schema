import type { FormProps } from '@rjsf/core';
import type { ObjectFieldTemplateProps } from '@rjsf/utils';
import { Card, Col, Row, Space } from 'antd';
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

export const ssiFormTemplates: FormProps['templates'] = {
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
    <Space direction="vertical" className="ssi-vostro-form-content">
      {/* Primary Information */}
      <Card
        className="primary-section"
        title="Primary Information"
        size="small"
      >
        <div className="section-content">
          <Row>
            <Col span={12}>{getPropertyContent('ssiType')}</Col>
            <Col span={12}>{getPropertyContent('swiftType')}</Col>
            <Col span={12}>{getPropertyContent('settlementMeans')}</Col>
            <Col span={12}>{getPropertyContent('settlementAccount')}</Col>
            <Col span={12}>{getPropertyContent('coveredPayment')}</Col>
          </Row>
        </div>
      </Card>

      {/* Beneficiary Customer */}
      <Card
        className="beneficiary-section"
        title="Beneficiary Customer"
        size="small"
      >
        <div className="section-content">
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
      </Card>

      {/* Account with Institution */}
      <Card
        className="account-institution-section"
        title="Account with Institution"
        size="small"
      >
        <div className="section-content">
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
      </Card>

      {/* Intermediary Institution */}
      <Card
        className="intermediary-institution-section"
        title="Intermediary Institution"
        size="small"
      >
        <div className="section-content">
          <Row>
            <Col span={12}>{getPropertyContent('intermediaryBic')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryName')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryAccount')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryAddress')}</Col>
            <Col span={12}>{getPropertyContent('intermediaryCity')}</Col>
          </Row>
        </div>
      </Card>

      {/* Receiver's Correspondent */}
      <Card
        className="receiver-correspondent-section"
        title="Receiver's Correspondent"
        size="small"
      >
        <div className="section-content">
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
      </Card>

      {/* Ordering Customer */}
      <Card
        className="ordering-customer-section"
        title="Ordering Customer"
        size="small"
      >
        <div className="section-content">
          <Row>
            <Col span={12}>{getPropertyContent('orderCustomerBic')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerName')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerAccount')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerAddress')}</Col>
            <Col span={12}>{getPropertyContent('orderCustomerCity')}</Col>
          </Row>
        </div>
      </Card>

      {/* Additional Information */}
      <Card
        className="sender-info-subsection"
        title="Sender to Receiver Information"
        size="small"
      >
        <div className="section-content">
          <Row>
            <Col span={6}>{getPropertyContent('senderToReceiver1')}</Col>
            <Col span={6}>{getPropertyContent('senderToReceiver2')}</Col>
            <Col span={6}>{getPropertyContent('senderToReceiver3')}</Col>
            <Col span={6}>{getPropertyContent('senderToReceiver4')}</Col>
            <Col span={6}>{getPropertyContent('senderToReceiver5')}</Col>
            <Col span={6}>{getPropertyContent('senderToReceiver6')}</Col>
          </Row>
        </div>
      </Card>
      <Card
        className="remittance-info-subsection"
        title="Remittance Information"
        size="small"
      >
        <div className="section-content">
          <Row>
            <Col span={6}>{getPropertyContent('remittanceInfomation1')}</Col>
            <Col span={6}>{getPropertyContent('remittanceInfomation2')}</Col>
            <Col span={6}>{getPropertyContent('remittanceInfomation3')}</Col>
            <Col span={6}>{getPropertyContent('remittanceInfomation4')}</Col>
          </Row>
        </div>
      </Card>
    </Space>
  );
};

export const ssiVostroFormTemplates = {
  ObjectFieldTemplate: SsiVostroFormLayout,
};
