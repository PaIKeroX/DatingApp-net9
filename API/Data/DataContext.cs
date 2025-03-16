using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // กำหนด primary key สำหรับ UserLike
        builder.Entity<UserLike>()
            .HasKey(k => new { k.SourceUserId, k.TargetUserId });

        // กำหนดความสัมพันธ์ระหว่าง SourceUser และ LikedUsers
        builder.Entity<UserLike>()
            .HasOne(ul => ul.SourceUser)
            .WithMany(u => u.LikedUsers)
            .HasForeignKey(ul => ul.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        // กำหนดความสัมพันธ์ระหว่าง TargetUser และ LikedByUsers
        builder.Entity<UserLike>()
            .HasOne(ul => ul.TargetUser)
            .WithMany(u => u.LikedByUsers)
            .HasForeignKey(ul => ul.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}