import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ShipNotificationPage: React.FC = () => {
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

  // Reusable styles
  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '600',
    color: '#2C2C2C',
    fontSize: '15px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #F0E8E3',
    borderRadius: '10px',
    fontSize: '15px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  };

  const smallTextStyle: React.CSSProperties = {
    color: '#6B6B6B',
    fontSize: '13px',
    display: 'block',
    marginTop: '6px',
    lineHeight: '1.5'
  };

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
      paddingTop: '120px', // Space for navbar
      paddingBottom: '60px',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(216, 138, 117, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #D88A75 0%, #E09B8A 100%)',
          color: 'white',
          padding: '40px 30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '0 0 12px 0',
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>📦 Send Shipping Notification</h1>
          <p style={{
            margin: 0,
            opacity: 0.95,
            fontSize: 'clamp(14px, 3vw, 16px)'
          }}>Notify customer that their order has shipped</p>
        </div>

        {/* Success Message */}
        {success && responseData && (
          <div style={{
            margin: '24px',
            padding: '24px',
            background: '#e8f5e9',
            borderLeft: '5px solid #4caf50',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.1)'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              color: '#2e7d32',
              fontSize: '18px',
              fontWeight: '600'
            }}>✅ Notification Sent Successfully!</h3>
            <p style={{
              margin: '8px 0',
              color: '#1b5e20',
              fontSize: '15px',
              lineHeight: '1.6'
            }}>
              <strong>Email sent to:</strong> {responseData.sentTo}
            </p>
            <p style={{
              margin: '8px 0',
              color: '#1b5e20',
              fontSize: '15px',
              lineHeight: '1.6'
            }}>
              <strong>Tracking:</strong> {responseData.trackingNumber} ({responseData.carrier})
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            margin: '24px',
            padding: '24px',
            background: '#ffebee',
            borderLeft: '5px solid #f44336',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(244, 67, 54, 0.1)'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              color: '#c62828',
              fontSize: '18px',
              fontWeight: '600'
            }}>❌ Error</h3>
            <p style={{
              margin: 0,
              color: '#b71c1c',
              fontSize: '15px',
              lineHeight: '1.6'
            }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          padding: 'clamp(20px, 5vw, 40px)'
        }}>
          {/* Order Reference */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              color: '#2C2C2C',
              fontSize: '15px'
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
                padding: '14px 16px',
                border: '2px solid #F0E8E3',
                borderRadius: '10px',
                fontSize: '15px',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#D88A75'}
              onBlur={(e) => e.target.style.borderColor = '#F0E8E3'}
            />
            <small style={{
              color: '#6B6B6B',
              fontSize: '13px',
              display: 'block',
              marginTop: '6px'
            }}>
              From the order notification email (Stripe Session ID)
            </small>
          </div>

          {/* Tracking Number */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              Tracking Number <span style={{ color: '#D88A75' }}>*</span>
            </label>
            <input
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              placeholder="1Z999AA10123456784"
              required
              style={{ ...inputStyle, fontFamily: 'monospace' }}
              onFocus={(e) => e.target.style.borderColor = '#D88A75'}
              onBlur={(e) => e.target.style.borderColor = '#F0E8E3'}
            />
          </div>

          {/* Carrier */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              Carrier <span style={{ color: '#D88A75' }}>*</span>
            </label>
            <select
              name="carrier"
              value={formData.carrier}
              onChange={handleInputChange}
              required
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => e.target.style.borderColor = '#D88A75'}
              onBlur={(e) => e.target.style.borderColor = '#F0E8E3'}
            >
              {carriers.map(carrier => (
                <option key={carrier} value={carrier}>{carrier}</option>
              ))}
            </select>
          </div>

          {/* Estimated Delivery (Optional) */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              Estimated Delivery Date (Optional)
            </label>
            <input
              type="date"
              name="estimatedDelivery"
              value={formData.estimatedDelivery}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#D88A75'}
              onBlur={(e) => e.target.style.borderColor = '#F0E8E3'}
            />
          </div>

          {/* Tracking URL (Optional) */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              Custom Tracking URL (Optional)
            </label>
            <input
              type="url"
              name="trackingUrl"
              value={formData.trackingUrl}
              onChange={handleInputChange}
              placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#D88A75'}
              onBlur={(e) => e.target.style.borderColor = '#F0E8E3'}
            />
            <small style={smallTextStyle}>
              Leave blank to auto-generate based on carrier
            </small>
          </div>

          {/* Notes (Optional) */}
          <div style={{ marginBottom: '30px' }}>
            <label style={labelStyle}>
              Internal Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any internal notes about this shipment..."
              rows={4}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '100px',
                fontFamily: 'inherit',
                lineHeight: '1.5'
              }}
              onFocus={(e) => e.target.style.borderColor = '#D88A75'}
              onBlur={(e) => e.target.style.borderColor = '#F0E8E3'}
            />
            <small style={smallTextStyle}>
              These notes are for your reference only and won't be sent to the customer
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px 24px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #D88A75 0%, #E09B8A 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(216, 138, 117, 0.3)',
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(216, 138, 117, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(216, 138, 117, 0.3)';
            }}
          >
            {loading ? '📤 Sending...' : '📧 Send Tracking Email to Customer'}
          </button>

          {/* Info Box */}
          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: '#F0E8E3',
            borderRadius: '10px',
            fontSize: '14px',
            color: '#6B6B6B',
            borderLeft: '4px solid #D88A75'
          }}>
            <p style={{
              margin: '0 0 12px 0',
              fontWeight: '600',
              color: '#2C2C2C',
              fontSize: '15px'
            }}>What happens when you submit:</p>
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              lineHeight: '1.8'
            }}>
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
