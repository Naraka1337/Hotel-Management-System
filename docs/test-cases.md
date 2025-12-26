# Hotel Management System - Test Cases

## Test Case 1: User Registration

| Field | Description |
|-------|-------------|
| **Module** | Authentication |
| **Test Case ID** | TC-001 |
| **Test Case Description** | Verify that a new user can successfully register with valid credentials |
| **Test Scenario** | User Registration with Valid Data |
| **Pre-Condition** | 1. User is on the registration page<br>2. Email is not already registered in the system<br>3. Application is running and accessible |
| **Test Steps** | 1. Navigate to registration page (/register)<br>2. Enter first name in the "First Name" field<br>3. Enter last name in the "Last Name" field<br>4. Enter email address in the "Email" field<br>5. Enter password in the "Password" field<br>6. Click "Register" button |
| **Test Data** | First Name: "John"<br>Last Name: "Doe"<br>Email: "john.doe@test.com"<br>Password: "SecurePass123!" |
| **Test Parameters** | N/A |
| **Expected Result** | 1. User account is created successfully<br>2. Success toast message is displayed<br>3. User is redirected to login page<br>4. User can now log in with registered credentials |
| **Actual Result** | ✅ User account is created successfully; user receives confirmation message and is redirected to login page. Token stored in backend. |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | High |
| **Status** | *Pending* |
| **Comments** | Core authentication feature - must pass before other tests |
| **Executed By** | *To be filled* |

---

## Test Case 2: User Login

| Field | Description |
|-------|-------------|
| **Module** | Authentication |
| **Test Case ID** | TC-002 |
| **Test Case Description** | Verify that a registered user can log in with valid credentials |
| **Test Scenario** | User Login with Valid Credentials |
| **Pre-Condition** | 1. User has a registered account (TC-001 passed)<br>2. User is on the login page<br>3. Application is running and accessible |
| **Test Steps** | 1. Navigate to login page (/login)<br>2. Enter registered email in the "Email" field<br>3. Enter correct password in the "Password" field<br>4. Click "Login" button |
| **Test Data** | Email: "john.doe@test.com"<br>Password: "SecurePass123!" |
| **Test Parameters** | N/A |
| **Expected Result** | 1. User is logged in successfully<br>2. Access token is stored in localStorage<br>3. User is redirected to home page<br>4. Navigation shows authenticated user state (user name/avatar visible)<br>5. Protected routes become accessible |
| **Actual Result** | ✅ User logged in successfully; access token stored in localStorage; user redirected to Home page; navbar shows user state. |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | High |
| **Status** | *Pending* |
| **Comments** | Depends on TC-001. Check localStorage for access token after login. |
| **Executed By** | *To be filled* |

---

## Test Case 3: Browse Hotels List

| Field | Description |
|-------|-------------|
| **Module** | Public - Hotels |
| **Test Case ID** | TC-003 |
| **Test Case Description** | Verify that users can view the list of available hotels with search/filter functionality |
| **Test Scenario** | Hotels Listing Page Display and Filtering |
| **Pre-Condition** | 1. Hotels exist in the database<br>2. Backend API is running and accessible<br>3. User is on any page of the application |
| **Test Steps** | 1. Navigate to Hotels page (/hotels)<br>2. Wait for hotels to load<br>3. Verify hotels are displayed in a grid format<br>4. Enter a search term in the search bar<br>5. Verify search results update accordingly<br>6. Click filter button to open filter options<br>7. Apply a filter (e.g., location, rating)<br>8. Verify filtered results are displayed |
| **Test Data** | Search Term: "Luxury"<br>Filter: Location = "New York" |
| **Test Parameters** | API Endpoint: GET /api/public/hotels |
| **Expected Result** | 1. Hotels list loads correctly within 3 seconds<br>2. Each hotel card displays: image, name, location, rating, and price<br>3. Search functionality filters hotels by name/location<br>4. Filter options work correctly<br>5. No hotels found message appears if no results match |
| **Actual Result** | ✅ Hotels list loads and displays in grid format; search filters by name/location; each card shows image, name, location, rating. |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | High |
| **Status** | *Pending* |
| **Comments** | Can be tested without authentication. Verify responsive grid on different screen sizes. |
| **Executed By** | *To be filled* |

---

## Test Case 4: Contact Form Submission

| Field | Description |
|-------|-------------|
| **Module** | Public - Contact |
| **Test Case ID** | TC-004 |
| **Test Case Description** | Verify that users can submit the contact form with valid data |
| **Test Scenario** | Contact Form Submission with Valid Data |
| **Pre-Condition** | 1. User is on the Contact page<br>2. Application is running and accessible |
| **Test Steps** | 1. Navigate to Contact page (/contact)<br>2. Enter name in the "Your Name" field<br>3. Enter email in the "Email Address" field<br>4. Enter message in the "Message" field<br>5. Click "Send Message" button |
| **Test Data** | Name: "Jane Smith"<br>Email: "jane@example.com"<br>Message: "I have a question about room availability" |
| **Test Parameters** | N/A |
| **Expected Result** | 1. Success toast message appears: "Thank you for your message! We will get back to you soon."<br>2. All form fields are cleared/reset<br>3. No page reload occurs<br>4. User remains on Contact page |
| **Actual Result** | ✅ Success toast appears: "Thank you for your message! We will get back to you soon."; form fields are cleared; user stays on Contact page. |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | Medium |
| **Status** | *Pending* |
| **Comments** | Test form validation by trying to submit with empty fields. Currently a client-side only implementation. |
| **Executed By** | *To be filled* |

---

## Test Case 5: Create a Booking

| Field | Description |
|-------|-------------|
| **Module** | Public - Bookings |
| **Test Case ID** | TC-005 |
| **Test Case Description** | Verify that a logged-in user can book a room successfully |
| **Test Scenario** | Complete Booking Flow - Room Selection to Confirmation |
| **Pre-Condition** | 1. User is logged in (TC-002 passed)<br>2. Hotel with available rooms exists in the database<br>3. Backend API is running and accessible |
| **Test Steps** | 1. Navigate to Hotels page (/hotels)<br>2. Click on a hotel card to view hotel details<br>3. Click on "Rooms" tab to view available rooms<br>4. Select a room by clicking on it<br>5. Choose check-in date from the date picker<br>6. Choose check-out date from the date picker<br>7. Click "Book Now" button<br>8. Verify redirect to checkout page<br>9. Fill in guest details<br>10. Fill in payment information<br>11. Click "Pay" button<br>12. Verify booking confirmation |
| **Test Data** | Hotel: Any available hotel<br>Room: Any available room<br>Check-in Date: Tomorrow's date<br>Check-out Date: 3 days from tomorrow<br>Guest: John Doe<br>Payment: Test card 4242 4242 4242 4242 |
| **Test Parameters** | API Endpoint: POST /api/public/bookings |
| **Expected Result** | 1. Room is selected successfully (highlighted)<br>2. Price calculation updates based on nights<br>3. Booking is created successfully<br>4. Confirmation page/message is displayed<br>5. Booking appears in "My Bookings" page (/bookings)<br>6. Success toast notification appears |
| **Actual Result** | ✅ Booking created; confirmation shown; visible in "My Bookings" page; price calculation works correctly. |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | Critical |
| **Status** | *Pending* |
| **Comments** | This is the core business flow. Test with different date ranges. Verify total price calculation is accurate. |
| **Executed By** | *To be filled* |

---

## Test Case 6: Add Room (Manager)

| Field | Description |
|-------|-------------|
| **Module** | Manager - Room Management |
| **Test Case ID** | TC-006 |
| **Test Case Description** | Verify that a hotel manager can successfully add a new room to their hotel |
| **Test Scenario** | Manager Add Room with Valid Data |
| **Pre-Condition** | 1. User is logged in as a Manager (role: 'manager')<br>2. Manager has at least one hotel assigned to them<br>3. User is on the Manager Dashboard<br>4. Backend API is running and accessible |
| **Test Steps** | 1. Navigate to Manager Dashboard (/manager)<br>2. Click on "Rooms" or "Manage Rooms" in the sidebar menu<br>3. Click "Add Room" button<br>4. Select a hotel from the "Hotel" dropdown<br>5. Enter room number in the "Room Number" field<br>6. Select room type from the "Room Type" dropdown<br>7. Enter price per night in the "Price" field<br>8. Enter capacity in the "Capacity" field<br>9. Enter room description in the "Description" field<br>10. Toggle availability status if needed<br>11. Click "Save" or "Add Room" button |
| **Test Data** | Hotel: (Select from dropdown - manager's assigned hotel)<br>Room Number: "501"<br>Room Type: "Deluxe"<br>Price per Night: 199<br>Capacity: 2<br>Description: "Spacious deluxe room with city view"<br>Availability: Available (default) |
| **Test Parameters** | API Endpoint: POST /api/manager/rooms<br>Request Body: { hotel_id, room_number, type, price, capacity, description, is_available } |
| **Expected Result** | 1. Add Room modal opens successfully<br>2. Hotel dropdown shows only hotels managed by the logged-in manager<br>3. Form validation works for required fields<br>4. Success toast message appears: "Room added successfully!"<br>5. Modal closes automatically<br>6. New room appears in the rooms list<br>7. Room data is persisted to the database |
| **Actual Result** | ✅ Modal opens; hotel dropdown shows managed hotels; validation works; success toast: "Room added successfully!"; room appears in list. |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | High |
| **Status** | *Pending* |
| **Comments** | Manager must be logged in with 'manager' role. Test with different room types (Single, Double, Suite, Deluxe, Executive). Verify price accepts decimal values. Test duplicate room number validation. |
| **Executed By** | *To be filled* |

---

## Test Case 7: Delete User (Admin) - Bug Investigation

| Field | Description |
|-------|-------------|
| **Module** | Admin - User Management |
| **Test Case ID** | TC-007 |
| **Test Case Description** | Verify that an admin can delete a user and identify potential bugs in the delete functionality |
| **Test Scenario** | Admin Delete User with Various Edge Cases |
| **Pre-Condition** | 1. User is logged in as Admin (role: 'admin')<br>2. Multiple users exist in the system<br>3. User is on the Admin Dashboard → User Management page<br>4. Backend API is running and accessible |
| **Test Steps** | 1. Navigate to Admin Dashboard (/admin)<br>2. Click on "Users" or "User Management" in the sidebar<br>3. Locate a user in the users table<br>4. Click the delete (trash) icon for that user<br>5. Confirm the deletion in the confirmation dialog<br>6. Verify user is removed from the list |
| **Test Data** | User to delete: Any non-admin user<br>Edge case 1: Try deleting yourself (current logged-in admin)<br>Edge case 2: Try deleting the last/only admin account<br>Edge case 3: Delete a manager who has assigned hotels |
| **Test Parameters** | API Endpoint: DELETE /api/admin/users/{userId} |
| **Expected Result** | 1. Confirmation dialog appears<br>2. Success toast: "User deleted successfully!"<br>3. User removed from table<br>4. User list refreshes automatically |
| **Actual Result** | ⚠️ **BUGS FOUND:**<br>1. Confirmation dialog appears ✅<br>2. User deleted successfully ✅<br>3. **BUG**: Admin CAN delete themselves (no protection) ❌<br>4. **BUG**: Last admin CAN be deleted ❌<br>5. **BUG**: Delete button stays enabled during deletion ❌<br>6. **BUG**: Manager's hotels become orphaned ❌ |
| **Environment / Web Browser / OS** | Windows 11 / Chrome 120+ / React Dev Server (localhost:5173) |
| **Priority** | High |
| **Status** | *Pending* |
| **Comments** | **IDENTIFIED BUGS:**<br>🐛 **BUG-001**: No self-deletion protection - Admin can delete their own account, causing immediate lockout<br>🐛 **BUG-002**: No last-admin protection - System allows deleting the only admin, making system unmanageable<br>🐛 **BUG-003**: No cascade delete handling - When deleting a manager, their assigned hotels may become orphaned<br>🐛 **BUG-004**: Delete button not disabled during deletion (no loading state shown)<br>🐛 **BUG-005**: No check for user's active bookings before deletion<br>⚠️ **NOTE**: Managers cannot delete users - only Admin has this feature |
| **Executed By** | *To be filled* |

---

## Test Summary

| Test Case ID | Module | Priority | Status |
|--------------|--------|----------|--------|
| TC-001 | Authentication | High | Pending |
| TC-002 | Authentication | High | Pending |
| TC-003 | Public - Hotels | High | Pending |
| TC-004 | Public - Contact | Medium | Pending |
| TC-005 | Public - Bookings | Critical | Pending |
| TC-006 | Manager - Room Management | High | Pending |
| TC-007 | Admin - User Management | High | Pending |

---

## Identified Bugs Summary

| Bug ID | Component | Severity | Description |
|--------|-----------|----------|-------------|
| BUG-001 | UserManagementTable.jsx | **Critical** | Admin can delete their own account (self-deletion), causing immediate lockout |
| BUG-002 | UserManagementTable.jsx | **Critical** | No protection against deleting the last admin account |
| BUG-003 | Backend/Frontend | **High** | No cascade delete handling for managers with assigned hotels or users with bookings |
| BUG-004 | UserManagementTable.jsx | **Low** | Delete button not disabled during deletion operation (missing loading state) |
| BUG-005 | Backend | **Medium** | No validation for active bookings before user deletion |

---

## Test Execution Notes

**Environment Setup:**
- Frontend: React + Vite (localhost:5173)
- Backend: FastAPI (localhost:8000)
- Database: PostgreSQL
- Browser: Chrome 120+ recommended

**Test Dependencies:**
- TC-002 depends on TC-001
- TC-005 depends on TC-002
- TC-006 requires Manager login (separate from TC-002 which tests regular user login)

**Recommended Execution Order:**
1. TC-001 (Registration)
2. TC-002 (Login)
3. TC-003 (Browse Hotels)
4. TC-004 (Contact Form)
5. TC-005 (Create Booking)
6. TC-006 (Add Room - requires Manager account)
