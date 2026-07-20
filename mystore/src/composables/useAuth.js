import { ref } from 'vue'

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const userProfile = ref(JSON.parse(localStorage.getItem('user_profile')) || {
    name: 'Guest User',
    email: 'user@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=00A991&color=fff'
})

const authLoading = ref(false)
const authError = ref(null)

export function useAuth() {
    
    const login = async (email, password) => {
        authLoading.value = true
        authError.value = null
        try {
            // Mock API delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            isLoggedIn.value = true
            userProfile.value = {
                name: email.split('@')[0],
                email: email,
                avatar: `https://ui-avatars.com/api/?name=${email}&background=00A991&color=fff`
            }
            
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('user_profile', JSON.stringify(userProfile.value))
            return true
        } catch (err) {
            authError.value = "Invalid credentials"
            return false
        } finally {
            authLoading.value = false
        }
    }

   const signup = async (username, email, password) => {
        authLoading.value = true
        authError.value = null
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Yahan hum profile set kar rahe hain
            isLoggedIn.value = true
            userProfile.value = {
                name: username, // Ab yahan wo naam aayega jo user ne form mein dala
                email: email,
                avatar: `https://ui-avatars.com/api/?name=${username}&background=00A991&color=fff`
            }
            
            // LocalStorage mein save karein
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('user_profile', JSON.stringify(userProfile.value))
            
            return true
        } catch (err) {
            authError.value = "Signup failed"
            return false
        } finally {
            authLoading.value = false
        }
    }

    const logout = () => {
        isLoggedIn.value = false
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('user_profile')
    }

    return { 
        isLoggedIn, 
        userProfile, 
        login, 
        signup, 
        logout,
        authLoading,
        authError
    }
}