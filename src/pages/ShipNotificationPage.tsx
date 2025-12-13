import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ShipNotificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    orderReference: searchParams.get('order') || '',
    trackingNumber: '',
    carrier: 'DHL Express',
    estimatedDelivery: '',
    trackingUrl: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState<any>(null);

  const carriers = [
    'DHL Express',
    'FedEx',
    'UPS',
    'SF Express',
    'Hong Kong Post',
    'China Post',
    'Singapore Post',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/send-shipping-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send notification');
      }

      setSuccess(true);
      setResponseData(data);

      // Reset form except order reference
      setFormData({
        ...formData,
        trackingNumber: '',
        estimatedDelivery: '',
        trackingUrl: '',
        notes: ''
      });

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #FAF8F5, #F0E8E3)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #D88A75 0%, #E09B8A 100%)',
          color: 'white',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>📦 Send Shipping Notification</h1>
          <p style={{ margin: 0, opacity: 0.95 }}>Notify customer that their order has shipped</p>
        </div>

        {/* Success Message */}
        {success && responseData && (
          <div style={{
            margin: '20px 20px 0 20px',
            padding: '20px',
            background: '#e8f5e9',
            borderLeft: '4px solid #4caf50',
            borderRadius: '4px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>✅ Notification Sent Successfully!</h3>
            <p style={{ margin: '5px 0', color: '#1b5e20' }}>
              <strong>Email sent to:</strong> {responseData.sentTo}
            </p>
            <p style={{ margin: '5px 0', color: '#1b5e20' }}>
              <strong>Tracking:</strong> {responseData.trackingNumber} ({responseData.carrier})
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            margin: '20px 20px 0 20px',
            padding: '20px',
            background: '#ffebee',
            borderLeft: '4px solid #f44336',
            borderRadius: '4px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#c62828' }}>❌ Error</h3>
            <p style={{ margin: 0, color: '#b71c1c' }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
          {/* Order Reference */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#2C2C2C'
            }}>
              Order Reference <span style={{ color: '#D88A75' }}>*</span>
            </label>
            <input
              type="text"
              name="orderReference"
              value={formData.orderReference}
              onChange={handleInputChange}
              placeholder="cs_test_..."
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F0E8E3',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'monospace',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#6B6B6B', fontSize: '13px' }}>
              From the order notification email (Stripe Session ID)
            </small>
          </div>

          {/* Tracking Number */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#2C2C2C'
            }}>
              Tracking Number <span style={{ color: '#D88A75' }}>*</span>
            </label>
            <input
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              placeholder="1Z999AA10123456784"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F0E8E3',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'monospace',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Carrier */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#2C2C2C'
            }}>
              Carrier <span style={{ color: '#D88A75' }}>*</span>
            </label>
            <select
              name="carrier"
              value={formData.carrier}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F0E8E3',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white',
                boxSizing: 'border-box'
              }}
            >
              {carriers.map(carrier => (
                <option key={carrier} value={carrier}>{carrier}</option>
              ))}
            </select>
          </div>

          {/* Estimated Delivery (Optional) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#2C2C2C'
            }}>
              Estimated Delivery Date (Optional)
            </label>
            <input
              type="date"
              name="estimatedDelivery"
              value={formData.estimatedDelivery}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F0E8E3',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Tracking URL (Optional) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#2C2C2C'
            }}>
              Custom Tracking URL (Optional)
            </label>
            <input
              type="url"
              name="trackingUrl"
              value={formData.trackingUrl}
              onChange={handleInputChange}
              placeholder="https://..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F0E8E3',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#6B6B6B', fontSize: '13px' }}>
              Leave blank to auto-generate based on carrier
            </small>
          </div>

          {/* Notes (Optional) */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#2C2C2C'
            }}>
              Internal Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any internal notes about this shipment..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F0E8E3',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ color: '#6B6B6B', fontSize: '13px' }}>
              These notes are for your reference only and won't be sent to the customer
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #D88A75 0%, #E09B8A 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? '📤 Sending...' : '📧 Send Tracking Email to Customer'}
          </button>

          {/* Info Box */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#F0E8E3',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#6B6B6B'
          }}>
            <p style={{ margin: '0 0 8px 0' }}><strong>What happens when you submit:</strong></p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Customer receives tracking email instantly</li>
              <li>Shipment record created in Airtable</li>
              <li>Customer info auto-filled from order</li>
              <li>Tracking link auto-generated (if supported)</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipNotificationPage;
