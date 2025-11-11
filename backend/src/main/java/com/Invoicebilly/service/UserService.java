package com.Invoicebilly.service;

import com.Invoicebilly.entity.User;
import com.Invoicebilly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User saveOrUpdateUser(User user){
        Optional<User> optionalUser = userRepository.findByClerkId(user.getClerkId());
        if(optionalUser.isPresent()){
            User exsistingUser = optionalUser.get();
            exsistingUser.setEmail(user.getEmail());
            exsistingUser.setFirstname(user.getFirstname());
            exsistingUser.setLastName(user.getLastName());
            exsistingUser.setPhotoURL(user.getPhotoURL());
            exsistingUser = userRepository.save(exsistingUser);
            return  exsistingUser;
        }
        return userRepository.save(user);
    }

    public void deleteAccount(String clerkId){
        User existingUser = userRepository.findByClerkId(clerkId).orElseThrow(() -> new RuntimeException(("User not found")));
        userRepository.delete(existingUser);

    }

    public User getAccountByClerkId(String clerkId){
        return userRepository.findByClerkId(clerkId).orElseThrow(() -> new RuntimeException(("User not found")));
    }
}
