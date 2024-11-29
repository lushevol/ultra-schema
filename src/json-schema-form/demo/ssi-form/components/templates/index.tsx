import type { ObjectFieldTemplateProps } from '@rjsf/utils';
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
    (name: string | RegExp) => {
      const property = props.properties.filter((p) =>
        typeof name === 'string' ? p.name === name : name.test(p.name),
      );
      return property ? property.map((p) => p.content) : null;
    },
    [props.properties],
  );

  return (
    <div className="ssi-vostro-form-content">
      {/* Primary Information */}
      <div className="primary-section">
        <h3>Primary Information</h3>
        <div className="grid-2">
          {getPropertyContent('ssiType')}
          {getPropertyContent('swiftType')}
          {getPropertyContent('settlementMeans')}
          {getPropertyContent('settlementAccount')}
          {getPropertyContent('coveredPayment')}
        </div>
      </div>

      {/* Beneficiary Information */}
      <div className="beneficiary-section">
        <h3>Beneficiary Information</h3>
        <div className="grid-2">
          {getPropertyContent(/beneficiary/)}
          {getPropertyContent('charges')}
          {getPropertyContent('tpp')}
        </div>
      </div>

      {/* Account with Institution */}
      <div className="account-institution-section">
        <h3>Account with Institution</h3>
        <div className="grid-2">
          {getPropertyContent(/accountWithInstitution/)}
        </div>
      </div>

      {/* Intermediary Institution */}
      <div className="intermediary-institution-section">
        <h3>Intermediary</h3>
        <div className="grid-2">{getPropertyContent(/intermediary/)}</div>
      </div>

      {/* Receiver's Correspondent */}
      <div className="receiver-correspondent-section">
        <h3>Receiver's Correspondent</h3>
        <div className="grid-2">
          {getPropertyContent(/receiversCorrespondent/)}
        </div>
      </div>

      {/* Ordering Customer */}
      <div className="ordering-customer-section">
        <h3>Ordering Customer</h3>
        <div className="grid-2">{getPropertyContent(/orderCustomer/)}</div>
      </div>

      {/* Additional Information */}
      <div className="additional-info-section">
        <h3>Additional Information</h3>
        <div className="grid-2">
          <div className="sender-info-subsection">
            <h4>Sender to Receiver Information</h4>
            {getPropertyContent(/senderToReceiver/)}
          </div>
          <div className="remittance-info-subsection">
            <h4>Remittance Information</h4>
            {getPropertyContent(/remittanceInfomation/)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ssiVostroFormTemplates = {
  ObjectFieldTemplate: SsiVostroFormLayout,
};
