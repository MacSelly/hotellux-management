# 🚀 Quick Start Guide

## Get Up and Running in 5 Minutes

### Step 1: Installation (1 minute)

```bash
# Clone and install
git clone <repository-url>
cd hotellux
npm install
```

### Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 3: Login (30 seconds)

Use any of these demo accounts:

```
Admin:        admin@hotel.com / admin123
Receptionist: reception@hotel.com / reception123  
Housekeeping: housekeeping@hotel.com / house123
Maintenance:  maintenance@hotel.com / maint123
Guest:        guest@hotel.com / guest123
```

### Step 4: Explore! (3 minutes)

#### As Admin
1. View Dashboard → See all KPIs and analytics
2. Go to Room Management → See animated room indicators
3. Visit User Management → Manage system users
4. Check AI Insights → View predictive analytics

#### As Receptionist
1. View Reservations → Manage bookings
2. Front Desk → Process check-ins/outs
3. Room Management → Update room statuses

#### As Housekeeping
1. View Tasks → See assigned cleaning tasks
2. Check Inventory → Monitor stock levels
3. Update Status → Mark tasks complete

#### As Maintenance
1. View Work Orders → See repair requests
2. Update Orders → Mark repairs complete
3. Check Equipment → Monitor equipment status

#### As Guest
1. View Reservation → See your booking
2. Request Services → Order room service
3. View Bill → Check charges

---

## 🎨 Customize Your Experience

### Change Theme
Click the sun/moon toggle in the sidebar

### Adjust Animations
In Room Management → Animation Settings panel:
- **Off** - No animations
- **Low** - Minimal effects
- **Medium** - Default (recommended)
- **High** - Full effects with particles

### Filter Rooms
- By floor: Floor 1, 2, 3, 4
- By status: Available, Occupied, Cleaning
- By type: Standard, Deluxe, Suite, Executive

---

## 🔧 Common Tasks

### Create a Reservation
1. Go to Reservations
2. Click "New Reservation" button
3. Fill in guest details
4. Select room and dates
5. Submit

### Update Room Status
1. Go to Room Management
2. Click on any room card
3. Change status (Available/Occupied/Cleaning/Maintenance)
4. Add occupant details if occupied
5. Save

### Assign Housekeeping Task
1. Login as housekeeping staff
2. View tasks dashboard
3. Click "Start Task" on any pending task
4. Complete the task
5. Click "Mark Complete"

### Create Work Order
1. Login as maintenance or receptionist
2. Go to Maintenance
3. Click "Create Work Order"
4. Enter room number and issue
5. Set priority and submit

---

## 📊 Understanding the Dashboard

### KPI Cards
- **Total Revenue** - Money earned this period
- **Occupancy Rate** - Percentage of rooms occupied
- **Active Guests** - Currently checked-in guests
- **Avg Daily Rate** - Average room price

### Charts
- **Revenue Analytics** - Monthly revenue trend
- **Room Occupancy** - Distribution by room type
- **Recent Activity** - Latest check-ins/outs

### Quick Stats
- **Check-ins Today** - Guests arriving
- **Check-outs Today** - Guests leaving
- **Guest Satisfaction** - Average rating

---

## 🎯 Pro Tips

### Keyboard Shortcuts
- `Tab` - Navigate between elements
- `Enter` - Activate buttons
- `Esc` - Close modals
- `Ctrl/Cmd + K` - Quick search (coming soon)

### Performance
- Enable "Low" animations on older devices
- Use list view in Room Management for faster loading
- Clear browser cache if experiencing slowness

### Best Practices
1. **Check out on time** - Maintain accurate room status
2. **Update inventory** - Keep stock levels current
3. **Complete tasks** - Mark housekeeping tasks done
4. **Close work orders** - Update maintenance status
5. **Review dashboard** - Check KPIs daily

---

## 🐛 Troubleshooting

### Can't Login?
- Check email spelling
- Verify password (no spaces)
- Try refreshing the page
- Clear browser cookies

### Data Not Showing?
- Check API status indicator
- Refresh the page
- Verify you're logged in
- Check your role permissions

### Animations Not Working?
- Check animation intensity setting
- Disable "reduced motion" in OS
- Try different browser
- Check if "Off" is selected

### Room Status Not Updating?
- Verify you have permission
- Check network connection
- Refresh the page
- Log out and back in

---

## 📱 Mobile Usage

The system is fully responsive:

### Portrait Mode
- Sidebar collapses to menu
- Cards stack vertically
- Touch-optimized controls

### Landscape Mode
- Full desktop experience
- Sidebar remains visible
- Charts fully interactive

### Recommended Browsers
- Chrome/Safari on iOS
- Chrome on Android
- Edge on Windows Mobile

---

## 🔐 Security Notes

### Session Management
- Sessions expire after 30 minutes
- Auto-logout on browser close
- Tokens stored securely

### Password Requirements
- Minimum 8 characters (production)
- Mix of letters and numbers (production)
- Changed regularly (recommended)

### Role Permissions
- **Guest** - View own data only
- **Housekeeping** - Task & inventory access
- **Maintenance** - Work orders only
- **Receptionist** - Front desk operations
- **Admin** - Full system access

---

## 📚 Next Steps

### Learn More
1. Read [Full Documentation](DOCUMENTATION.md)
2. Explore [API Reference](DOCUMENTATION.md#api-endpoints)
3. Check [Backend Setup](BACKEND_SETUP.md)

### Customize
1. Add your hotel logo
2. Configure room types
3. Set up rate plans
4. Customize email templates

### Deploy
1. Build for production: `npm run build`
2. Deploy to Vercel: `vercel deploy`
3. Or deploy to Netlify: `netlify deploy`
4. Configure environment variables

---

## ✅ Checklist for New Users

- [ ] Logged in successfully
- [ ] Explored dashboard
- [ ] Viewed all available modules
- [ ] Changed theme (light/dark)
- [ ] Adjusted animation settings
- [ ] Tested room status updates
- [ ] Read documentation
- [ ] Bookmarked this guide

---

## 🆘 Need Help?

### Resources
- **Documentation**: [DOCUMENTATION.md](DOCUMENTATION.md)
- **Backend Guide**: [BACKEND_SETUP.md](BACKEND_SETUP.md)
- **API Complete**: [API_IMPLEMENTATION_COMPLETE.md](API_IMPLEMENTATION_COMPLETE.md)

### Support
- Check the troubleshooting section above
- Review code examples in documentation
- Verify you're using latest version
- Clear cache and try again

---

**Enjoy your HotelLux Management System!** 🎉

Made with ❤️ for hotel managers worldwide.
