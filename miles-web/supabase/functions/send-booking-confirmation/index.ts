const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const bookingDetails = await req.json();
    console.log('Received booking confirmation request:', bookingDetails);

    const {
      customerName,
      customerEmail,
      experienceTitle,
      experienceLocation,
      bookingDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
      bookingId,
      bookingTime
    } = bookingDetails;

    // Format the booking date
    const formattedDate = new Date(bookingDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send confirmation email to customer
    const customerEmailContent = {
      to: [customerEmail],
      subject: `Booking Confirmed - ${experienceTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your Miles adventure awaits</p>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 18px; color: #374151; margin-bottom: 25px;">
              Hi ${customerName},
            </p>
            
            <p style="color: #6b7280; line-height: 1.6; margin-bottom: 25px;">
              Thank you for booking with Miles! We're excited to confirm your upcoming experience. 
              Here are your booking details:
            </p>
            
            <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
              <h2 style="color: #f97316; margin: 0 0 20px 0; font-size: 20px;">${experienceTitle}</h2>
              
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280; font-weight: 500;">Booking ID:</span>
                  <span style="color: #374151; font-weight: 600;">${bookingId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280; font-weight: 500;">Location:</span>
                  <span style="color: #374151; font-weight: 600;">${experienceLocation}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280; font-weight: 500;">Date:</span>
                  <span style="color: #374151; font-weight: 600;">${formattedDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                  <span style="color: #6b7280; font-weight: 500;">Guests:</span>
                  <span style="color: #374151; font-weight: 600;">${numberOfGuests} ${numberOfGuests === 1 ? 'person' : 'people'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                  <span style="color: #6b7280; font-weight: 500;">Total:</span>
                  <span style="color: #f97316; font-weight: 700; font-size: 18px;">$${totalPrice}</span>
                </div>
              </div>
              
              ${specialRequests ? `
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Special Requests:</h3>
                  <p style="color: #6b7280; margin: 0; font-style: italic;">${specialRequests}</p>
                </div>
              ` : ''}
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Your local host will contact you 24-48 hours before the experience</li>
                <li>You'll receive meeting point details and any last-minute updates</li>
                <li>Bring comfortable shoes and an appetite for adventure!</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; margin-bottom: 15px;">Questions about your booking?</p>
              <a href="mailto:of@thisismerci.com" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Contact Support</a>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              This confirmation was sent from Miles Travel<br>
              Safe travels and see you soon!
            </p>
          </div>
        </div>
      `,
      text: `
Booking Confirmed - ${experienceTitle}

Hi ${customerName},

Thank you for booking with Miles! Here are your booking details:

Booking ID: ${bookingId}
Experience: ${experienceTitle}
Location: ${experienceLocation}
Date: ${formattedDate}
Guests: ${numberOfGuests} ${numberOfGuests === 1 ? 'person' : 'people'}
Total: $${totalPrice}

${specialRequests ? `Special Requests: ${specialRequests}` : ''}

What's Next?
- Your local host will contact you 24-48 hours before the experience
- You'll receive meeting point details and any last-minute updates
- Bring comfortable shoes and an appetite for adventure!

Questions? Contact us at of@thisismerci.com

Safe travels and see you soon!
Miles Travel Team
      `
    };

    // Send notification email to Miles team
    const teamEmailContent = {
      to: ['of@thisismerci.com'],
      subject: `New Booking: ${experienceTitle} - ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Booking Received
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Customer Details:</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Booking Details:</h3>
            <p><strong>Experience:</strong> ${experienceTitle}</p>
            <p><strong>Location:</strong> ${experienceLocation}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Guests:</strong> ${numberOfGuests}</p>
            <p><strong>Total:</strong> $${totalPrice}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          
          ${specialRequests ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">Special Requests:</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px;">
                ${specialRequests}
              </div>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Booking submitted: ${new Date(bookingTime).toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Booking Received

Customer: ${customerName} (${customerEmail})
Experience: ${experienceTitle}
Location: ${experienceLocation}
Date: ${formattedDate}
Guests: ${numberOfGuests}
Total: $${totalPrice}
Booking ID: ${bookingId}

${specialRequests ? `Special Requests: ${specialRequests}` : ''}

Booking submitted: ${new Date(bookingTime).toLocaleString()}
      `
    };

    // Send both emails
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Send customer confirmation
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Miles Travel <of@thisismerci.com>',
        ...customerEmailContent
      }),
    });

    // Send team notification
    const teamResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Miles Bookings <of@thisismerci.com>',
        ...teamEmailContent
      }),
    });

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error('Failed to send customer email:', errorText);
      throw new Error(`Failed to send customer confirmation: ${customerResponse.status}`);
    }

    if (!teamResponse.ok) {
      const errorText = await teamResponse.text();
      console.error('Failed to send team notification:', errorText);
      // Don't throw here - customer email is more important
    }

    const customerResult = await customerResponse.json();
    console.log('Booking confirmation emails sent successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking confirmation sent successfully',
        customerEmailId: customerResult.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send booking confirmation'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});